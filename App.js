import React /*useState*/ from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Record from './src/Screens/Record'
import FeedNavigator from './src/Navigators/FeedNavigator'
import ProfileNavigator from './src/Navigators/ProfileNavigator'
import { AppUserContext } from './contexts'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// import LoggedOutNavigator from './src/Navigators/LoggedOutNavigator'
// import testUser from './dummyUser'

const Tab = createBottomTabNavigator()

export const AppNavigator = () => (
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
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        )
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    })}
  >
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
  const [appUser, setAppUser] = useState({
    user_id: '61485b4b2e8ed0bd929b436f',
    username: 'NovellaBayer',
    avatar_url: 'http://placeimg.com/640/480',
  })
  // const [userLoggedIn, setUserLoggedIn] = useState(true)
  // const [user, setUser] = useState(testUser)

  return (
    <AppUserContext.Provider value={{ appUser, setAppUser }}>
      <NavigationContainer>
        <AppNavigator />
        {/* {userLoggedIn ? <AppNavigator /> : <LoggedOutNavigator />} */}
      </NavigationContainer>
    </AppUserContext.Provider>
  )
}

export default App
