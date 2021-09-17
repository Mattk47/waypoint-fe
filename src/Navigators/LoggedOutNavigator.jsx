import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../Screens/Welcome'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'

export default LoggedOutNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Log In" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  )
}
