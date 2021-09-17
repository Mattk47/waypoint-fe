import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Record from './src/Screens/Record'
import FeedNavigator from './src/Navigators/FeedNavigator'
import ProfileNavigator from './src/Navigators/ProfileNavigator'
import LoggedOutNavigator from './src/Navigators/LoggedOutNavigator'

const Tab = createBottomTabNavigator()

export const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={FeedNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Record" component={Record} />
    <Tab.Screen
      name="You"
      component={ProfileNavigator}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
)

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState()

  if (!userLoggedIn) {
    return (
      <NavigationContainer>
        <LoggedOutNavigator />
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

export default App
