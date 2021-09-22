import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native'

export default Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  return (
    <ImageBackground
      source={require('../../assets/welcome.jpg')}
      resizeMode="cover"
      style={LoginStyles.bgImage}
    >
      <Text style={LoginStyles.title}>Log In</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Username"
        placeholderTextColor="black"
        onChangeText={setUsernameInput}
        value={usernameInput}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={setPasswordInput}
        value={passwordInput}
      />
      <Button title="Log In" color="white" />
    </ImageBackground>
  )
}

const LoginStyles = StyleSheet.create({
  bgImage: {
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
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'darkgrey',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
})
