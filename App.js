import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Record from './src/Screens/Record'
import FeedNavigator from './src/Navigators/FeedNavigator'
import ProfileNavigator from './src/Navigators/ProfileNavigator'

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

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
)

export default App