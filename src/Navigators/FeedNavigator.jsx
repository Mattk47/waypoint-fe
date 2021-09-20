import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Post from '../Screens/Post';
import Feed from '../Screens/Feed';
import ProfileNavigator from './ProfileNavigator'
import Comments from '../Screens/Comments'

export default FeedNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
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