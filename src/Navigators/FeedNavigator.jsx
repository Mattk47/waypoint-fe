import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Post from '../Screens/Post';
import Feed from '../Screens/Feed';

export default FeedNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Post" component={Post} />
      
    </Stack.Navigator>
  )
};