import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Record from '../Screens/Record'
import NewPost from '../Screens/NewPost'

export default RecordNavigator = () => {
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
        name="Record New"
        component={Record}
        options={{ title: 'Create route' }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{ title: 'Post route' }}
      />
    </Stack.Navigator>
  )
}
