import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native'

export default SignUp = () => {
  const [nameInput, setNameInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordInput2, setPasswordInput2] = useState('')

  return (
    <ImageBackground
      source={require('../../assets/welcome.jpg')}
      resizeMode="cover"
      style={SignUpStyles.bgImage}
    >
      <Text style={SignUpStyles.title}>Sign Up</Text>
      <TextInput
        style={SignUpStyles.input}
        placeholder="Full name"
        placeholderTextColor="black"
        onChangeText={setNameInput}
        value={nameInput}
      />
      <TextInput
        style={SignUpStyles.input}
        placeholder="Username"
        placeholderTextColor="black"
        onChangeText={setUsernameInput}
        value={usernameInput}
      />
      <TextInput
        style={SignUpStyles.input}
        placeholder="Password"
        placeholderTextColor="black"
        onChangeText={setPasswordInput}
        value={passwordInput}
      />
      <TextInput
        style={SignUpStyles.input}
        placeholder="Confirm password"
        placeholderTextColor="black"
        onChangeText={setPasswordInput2}
        value={passwordInput2}
      />
      <Button title="Sign Up" color="white" />
    </ImageBackground>
  )
}

const SignUpStyles = StyleSheet.create({
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
