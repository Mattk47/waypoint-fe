import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedNavigator from './src/Navigators/FeedNavigator'
import ProfileNavigator from './src/Navigators/ProfileNavigator'
import { AppUserContext, RouteFeedContext } from './contexts'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import RecordNavigator from './src/Navigators/RecordNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from './src/Screens/Welcome'
import Login from './src/Screens/Login'
import SignUp from './src/Screens/SignUp'


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export const AppNavigator = () => {
  const [routes, setRoutes] = useState([])
  const [appUser, setAppUser] = useState(null)

  return (
           <AppUserContext.Provider value={{ appUser, setAppUser }}>
    {appUser ? (
          <RouteFeedContext.Provider value={{ routes, setRoutes }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'home-circle' : 'home-circle-outline'
            } else if (route.name === 'Record') {
              iconName = focused ? 'record-circle' : 'record-circle-outline'
            } else if (route.name === 'You') {
              iconName = focused ? 'account-circle' : 'account-circle-outline'
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgb(225, 225, 225)',
          tabBarStyle: {
            paddingTop: 10,
            paddingBottom: 20,
            backgroundColor: 'rgb(70, 184, 159)',
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={FeedNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Record"
          component={RecordNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="You"
          component={ProfileNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </RouteFeedContext.Provider>

      ) : (
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
  </AppUserContext.Provider>
)
}
const App = () => {
  console.disableYellowBox = true

  return (

      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  )
  
}

export default App
