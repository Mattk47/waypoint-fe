import React, { useState, useContext } from 'react'
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Button,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppUserContext, RouteFeedContext } from '../../contexts'
import { postPoiByRouteId, postRoute } from '../../api'
import DefaultButton from '../Components/Button'

const NewPost = ({ navigation, route }) => {
  const [titleInput, setTitleInput] = useState('')
  const [descriptInput, setDescriptInput] = useState('')
  const {
    appUser: { user_id, username, avatar_url },
  } = useContext(AppUserContext)
  const { setRoutes } = useContext(RouteFeedContext)
  const { pois, locationsState, setLocationsState } = route.params

  const sendPost = async () => {
    const routeObj = {
      title: titleInput,
      description: descriptInput,
      user_id,
      coords: locationsState,
      start_time_date: locationsState[0].time,
    }
    try {
      const { route } = await postRoute(routeObj)
      Promise.all(
        pois.map((poi) => {
          poi.user_id = user_id
          return postPoiByRouteId(route._id, poi)
        })
      ).then(() => {
        AsyncStorage.clear()
        setLocationsState([])
        route.user_id = { username, avatar_url }
        setRoutes((curr) => {
          return [...new Set([route, ...curr])]
        })
        setTitleInput('')
        setDescriptInput('')
        navigation.goBack()
        navigation.navigate('Home', { screen: 'Feed', refresh: true })
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={NewPostStyles.container}>
      <TextInput
        style={NewPostStyles.input}
        placeholder="Add title"
        onChangeText={setTitleInput}
        value={titleInput}
        maxLength={40}
      />
      <TextInput
        style={[NewPostStyles.input, { height: 120 }]}
        placeholder="Add description"
        multiline={true}
        textAlignVertical="top"
        onChangeText={setDescriptInput}
        value={descriptInput}
        maxLength={500}
      />
      {/* <Button onPress={sendPost} title="Upload" /> */}
      <View style={NewPostStyles.buttonContainer}>
        <DefaultButton
          buttonText="Upload"
          onPressFunc={sendPost}
          disabled={titleInput === ''}
        />
        <DefaultButton buttonText="Discard" />
      </View>
    </View>
  )
}

export default NewPost

const NewPostStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'darkgrey',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgb(78, 181, 143)',
    borderRadius: 20,
  },
  buttonContainer: {
    marginRight: '10%',
    marginLeft: '10%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
