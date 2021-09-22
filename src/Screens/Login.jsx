import React, { useContext, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native'
import { postLogin } from '../../api'
import { AppUserContext } from '../../contexts'

export default Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [badLogin, setBadLogin] = useState(false)
  const { setAppUser } = useContext(AppUserContext)

  const handleLogin = async () => {
    const loggedIn = await postLogin(usernameInput, passwordInput)
    if (loggedIn.user) {
      console.log(loggedIn.user);
      setBadLogin(false)
      setAppUser(loggedIn.user)
    } else {
      setBadLogin(true)
      setUsernameInput('')
      setPasswordInput('')
    }
  }

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
      {badLogin && <Text>Incorrect log-in details, please try again</Text>}
      <Button title="Log In" color="white" onPress={handleLogin}/>
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
