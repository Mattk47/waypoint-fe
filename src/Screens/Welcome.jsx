import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native'

export default Welcome = () => {
  const nav = useNavigation()

  return (
    <ImageBackground
      source={require('../../assets/welcome.jpg')}
      resizeMode="contain"
      style={WelcomeStyles.bgImage}
    >
      <Text style={WelcomeStyles.title}>Welcome to Waypoint</Text>
      <Text style={WelcomeStyles.text}>Join our community today</Text>
      <Button
        title="Sign Up"
        color="white"
        onPress={() => {
          nav.navigate('Sign Up')
        }}
      />

      <Text style={WelcomeStyles.text}>Already a member?</Text>
      <Button
        title="Log In"
        color="white"
        onPress={() => {
          nav.navigate('Log In')
        }}
      />
    </ImageBackground>
  )
}

const WelcomeStyles = StyleSheet.create({
  bgImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
})
