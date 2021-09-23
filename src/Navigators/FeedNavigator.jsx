import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Image } from 'react-native'
import Post from '../Screens/Post'
import Feed from '../Screens/Feed'
import ProfileNavigator from './ProfileNavigator'
import Comments from '../Screens/Comments'
import logo from '../../assets/output-onlinepngtools.png'

export default FeedNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(70, 184, 159)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerTitle: () => (
            <Image
              source={logo}
              style={{ height: 40, width: 120, marginBottom: 20 }}
            />
          ),
        }}
      />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen
        name="UserProfile"
        component={Profile}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
