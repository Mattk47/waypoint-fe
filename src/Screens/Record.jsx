import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Polyline } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const locationStorageName = 'locations'

export default function Record() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationsState, setLocationsState] = useState([])
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })()
  }, [])

  useEffect(() => {
    getLocations().then(locations => {setLocationsState(locations)});
    const timerId = window.setInterval(() => {
      getLocations().then(locations => {
        if(locations.length !== locationsState.length) {
          console.log(locations);
          setLocationsState(locations)
        }
      })
    }, 5000);
    return () => window.clearInterval(timerId);
  }, []);

  const startTracking = async () => {
    await Location.startLocationUpdatesAsync('bgLocation', {
      accuracy: Location.Accuracy.High,
      timeInterval: 6000,
      distanceInterval: 5,
      foregroundService: {
        notificationTitle: 'Tracking is active',
        notificationBody: 'REcording your route',
        notificationColor: '#333333',
      },
      activityType: Location.ActivityType.Fitness,
      showsBackgroundLocationIndicator: true
    });
    console.log('[tracking]', 'started background location task');
  }

  const stopTracking = async () => {
    await Location.stopLocationUpdatesAsync('bgLocation');
    console.log('[tracking]', 'stopped background location task');
    await AsyncStorage.clear();
  }
  const [region, setRegion] = useState({
    latitude: 53.558297, 
    longitude: -1.635262, 
    latitudeDelta: 9, 
    longitudeDelta: 9
  });

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        region={locationsState.length > 0 ? ({latitude: locationsState[locationsState.length-1].coords.latitude, longitude: locationsState[locationsState.length-1].coords.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05}) : ({latitude: 53.558297, longitude: -1.635262, latitudeDelta: 9, longitudeDelta: 9})}
        // onRegionChangeComplete={region => setRegion(region)}
      >
        {locationsState.length > 0 && 
          <Marker 
            coordinate={{
              latitude: locationsState[locationsState.length-1].coords.latitude, 
              longitude: locationsState[locationsState.length-1].coords.longitude}}
          />
        }
        {locationsState.length > 0 && 
          <Polyline coordinates={getPolyline(locationsState)} lineDashPattern={[1]} />
        }
      </MapView>
      <View style = {styles.buttonbox}>
        <Pressable style={styles.button} onPress={startTracking}>
          <MaterialCommunityIcons name="map-marker-check" size={22} color="green" />
          <Text style={styles.text}>{'Start'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={startTracking }>
          <MaterialCommunityIcons name="camera-burst" size={22} color="black" />
          <Text style={styles.text}>{' PoI'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={stopTracking}>
          <MaterialCommunityIcons name="map-marker-remove-variant" size={22} color="red" />
          <Text style={styles.text}>{'Stop'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'lightgray',
    // alignItems: 'center',
    justifyContent:'space-evenly',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.72,
  },
  buttonbox:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    width: Dimensions.get('window').width * 0.3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
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
    elevation: 5
  },
});

TaskManager.defineTask('bgLocation', async (event) => {
  if (event.error) {
    return console.error('[tracking]', 'Something went wrong within the background location task...', event.error);
  }

  // console.log(event.data)
  const locations = event.data.locations
  try {
    for (const location of locations) {
      await addLocation(location);
    }
  } catch (error) {
    console.log('[tracking]', 'Something went wrong when saving a new location...', error);
  }
});

const addLocation = async (location) => {
  const existing = await getLocations();
  const locations = [...existing, location];
  await setLocations(locations);
  console.log('[storage]', 'added location -', locations.length, 'stored locations');
  return locations
}

const getLocations = async () => {
  const data = await AsyncStorage.getItem(locationStorageName);
  return data ? JSON.parse(data) : [];
}

const setLocations = async (locations) => {
  await AsyncStorage.setItem(locationStorageName, JSON.stringify(locations));
}

const logLocations = async () => {
  let json = await getLocations()
  // console.log(json)
}

const getPolyline = (locations) => {
    return locations.map(({ coords: { latitude, longitude } }) => {
      return { latitude, longitude }
  })
}
