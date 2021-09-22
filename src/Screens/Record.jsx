import React, { useContext, useState, useEffect } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
  Pressable,
  Image,
} from 'react-native'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppUserContext } from '../../contexts'
import addPhoto from '../../assets/photo.png'

const locationStorageName = 'locations'

export default function Record() {
  const {
    appUser: { user_id },
  } = useContext(AppUserContext)
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [recording, setRecording] = useState(false)
  const [text, setText] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [locationsState, setLocationsState] = useState([])
  const [pois, setPois] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const nav = useNavigation()

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
      let { bgStatus } = await Location.requestBackgroundPermissionsAsync()
      if (bgStatus !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
    })()
  }, [])

  useEffect(() => {
    getLocations().then((locations) => {
      setLocationsState(locations)
    })
    const timerId = window.setInterval(() => {
      getLocations().then((locations) => {
        if (locations.length !== locationsState.length) {
          setLocationsState(locations)
        }
      })
    }, 5000)
    return () => window.clearInterval(timerId)
  }, [])

  const startTracking = async () => {
    setRecording(true)
    await AsyncStorage.clear()
    await Location.startLocationUpdatesAsync('bgLocation', {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 6000,
      distanceInterval: 5,
      foregroundService: {
        notificationTitle: 'Tracking is active',
        notificationBody: 'REcording your route',
        notificationColor: '#333333',
      },
      activityType: Location.ActivityType.Fitness,
      showsBackgroundLocationIndicator: true,
    })
    console.log('[tracking]', 'started background location task')
  }

  const stopTracking = async () => {
    setRecording(false)
    await Location.stopLocationUpdatesAsync('bgLocation')
    console.log('[tracking]', 'stopped background location task')
    nav.navigate('NewPost', { pois, locationsState, setLocationsState })
  }

  const createThreeButtonAlert = () =>
    Alert.alert('Add photo', '', [
      {
        text: 'Take photo',
        onPress: takePhoto,
      },
      {
        text: 'Choose existing photo',
        onPress: pickImage,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])

  const pickImage = async () => {
    const cameraRollStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (cameraRollStatus.status !== 'granted') {
      alert('Sorry, we need these permissions to make this work!')
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    handlePickedImage(result)
  }

  const takePhoto = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()

    if (cameraStatus.status !== 'granted') {
      alert('Sorry, we need these permissions to make this work!')
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    handlePickedImage(result)
  }

  const handlePickedImage = async (result) => {
    if (!result.cancelled) {
      const imagePath = result.uri

      const manipResult = await ImageManipulator.manipulateAsync(imagePath, [
        { resize: { height: 1080, width: 1080 } },
      ])
      setImage(manipResult)

      const imageExt = result.uri.split('.').pop()
      const imageMime = `image/${imageExt}`

      let picture = await fetch(manipResult.uri)
      picture = await picture.blob()
      const file = new File([picture], `photo.${imageExt}`)
      const res = await fetch('https://waypoint-server.herokuapp.com/api/poi')
      const preSigned = await res.json()

      const postRes = await fetch(preSigned.uri, {
        method: 'PUT',
        body: file,
        headers: {
          'content-type': imageMime,
        },
      })
      setImageURL(JSON.stringify(postRes.url.split('?')[0]))
    }
  }

  const addPoi = () => {
    const coords = locationsState[locationsState.length - 1]
    const poiObj = {
      coords,
      photo: imageURL,
      narration: text !== '' && text,
    }
    setPois((curr) => {
      return [...curr, poiObj]
    })
    setText('')
    setImage(null)
    setImageURL(null)
    setModalVisible(false)
    alert('Waypoint added')
  }

  return (
    <View style={styles.centeredView}>
      <MapView
        style={styles.map}
        region={
          locationsState.length > 0
            ? {
                latitude: locationsState[locationsState.length - 1].latitude,
                longitude: locationsState[locationsState.length - 1].longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : {
                latitude: 53.558297,
                longitude: -1.635262,
                latitudeDelta: 9,
                longitudeDelta: 9,
              }
        }
        // onRegionChangeComplete={region => setRegion(region)}
      >
        {locationsState.length > 0 && (
          <Marker
            coordinate={{
              latitude: locationsState[locationsState.length - 1].latitude,
              longitude: locationsState[locationsState.length - 1].longitude,
            }}
          />
        )}
        {pois.length > 0 &&
          pois.map((poi, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: poi.coords.latitude,
                  longitude: poi.coords.longitude,
                }}
                pinColor="blue"
                // onPress={() => popupWindow(poi)}
              />
            )
          })}
        {locationsState.length > 0 && (
          <Polyline
            coordinates={getPolyline(locationsState)}
            lineDashPattern={[1]}
            strokeColor="red"
          />
        )}
      </MapView>
      <View style={styles.buttonbox}>
        {!recording && (
          <Pressable style={styles.button} onPress={startTracking}>
            <MaterialCommunityIcons
              name="map-marker-check"
              size={22}
              color="green"
            />
            <Text style={styles.text}>{'Start'}</Text>
          </Pressable>
        )}
        {recording && (
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="camera-burst"
              size={22}
              color="black"
            />
            <Text style={styles.text}>{' PoI'}</Text>
          </Pressable>
        )}
        {recording && (
          <Pressable style={styles.button} onPress={stopTracking}>
            <MaterialCommunityIcons
              name="map-marker-remove-variant"
              size={22}
              color="red"
            />
            <Text style={styles.text}>{'Stop'}</Text>
          </Pressable>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        {/* <View style={styles.centeredView}> */}
        <View style={styles.modalView}>
          <Pressable onPress={createThreeButtonAlert}>
            <Image
              source={image ? { uri: image.uri } : addPhoto}
              style={{ width: 100, height: 100 }}
            />
          </Pressable>
          <View style={styles.footer}>
            <TextInput
              style={styles.input}
              placeholder="Add comment"
              onChangeText={setText}
              multiline={true}
              value={text}
              maxLength={500}
            />
            <Button
              title="Send"
              disabled={text === '' && !image}
              onPress={addPoi}
            />
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
        {/* </View> */}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.82,
  },
  buttonbox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute', //use absolute position to show button on top of the map
    bottom: '2%', //for center align
    alignSelf: 'center', //for align to right
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    width: Dimensions.get('window').width * 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'darkgrey',
    // marginRight: 5,
    // marginLeft: 10,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
  },
  footer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // height: 140,
    bottom: 0,
    width: '100%',
  },
})

TaskManager.defineTask('bgLocation', async (event) => {
  if (event.error) {
    return console.error(
      '[tracking]',
      'Something went wrong within the background location task...',
      event.error
    )
  }

  // console.log(event.data)
  const locations = event.data.locations
  try {
    for (const location of locations) {
      await addLocation(location)
    }
  } catch (error) {
    console.log(
      '[tracking]',
      'Something went wrong when saving a new location...',
      error
    )
  }
})

const addLocation = async ({ coords: { latitude, longitude }, timestamp }) => {
  const newLocation = { latitude, longitude, time: timestamp }
  const existing = await getLocations()
  const locations = [...existing, newLocation]
  await setLocations(locations)
  console.log(
    '[storage]',
    'added location -',
    locations.length,
    'stored locations'
  )
  return locations
}

const getLocations = async () => {
  const data = await AsyncStorage.getItem(locationStorageName)
  return data ? JSON.parse(data) : []
}

const setLocations = async (locations) => {
  await AsyncStorage.setItem(locationStorageName, JSON.stringify(locations))
}

const logLocations = async () => {
  let json = await getLocations()
  // console.log(json)
}

const getPolyline = (locations) => {
  return locations.map(({ latitude, longitude }) => {
    return { latitude, longitude }
  })
}
