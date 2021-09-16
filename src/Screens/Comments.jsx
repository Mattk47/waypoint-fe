import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Dimensions,
} from 'react-native'

const Comments = () => {
  const [text, setText] = useState('')

  return (
    <View style={CommentsStyles.container}>
      <View style={CommentsStyles.commentsContainer}>
        <Text>Comments...</Text>
      </View>
      <View style={CommentsStyles.footer}>
        <TextInput
          style={CommentsStyles.input}
          placeholder="Add comment"
          onChangeText={setText}
          value={text}
          maxLength={140}
        />
        <Button title="Send" />
      </View>
    </View>
  )
}

export default Comments

const CommentsStyles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'darkgrey',
    padding: 10,
    borderRadius: 20,
  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 15,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    height: 40,
    left: 15,
    top: Dimensions.get('window').height - 220,
    width: Dimensions.get('window').width,
  },
})
