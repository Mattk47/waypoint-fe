import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Record from '../Screens/Record'
import NewPost from '../Screens/NewPost'

export default RecordNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Record New" component={Record} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  )
}
