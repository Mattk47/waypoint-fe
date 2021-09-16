import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../Screens/Profile'
import Followers from '../Screens/Followers'
import Following from '../Screens/Following'

export default ProfileNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Following" component={Following} />
    </Stack.Navigator>
  )
}
