import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from "react-native"

export default Profile = () => {
  return (
    <View>

      <View style={ProfileStyles.card}>
        <Image style={ProfileStyles.avatar} source={{uri: 'https://www.computerhope.com/jargon/g/guest-user.jpg'}} resizeMode='contain'/>
        <View style={ProfileStyles.content}>
          <Text style={ProfileStyles.text}>Username</Text>
          <Text style={ProfileStyles.text}>Followers 50</Text>
          <Text style={ProfileStyles.text}>Following 50</Text>
        </View>
      </View>
    </View>
  )
}

const ProfileStyles = StyleSheet.create({
  card: {
    padding: 10,
    width: Dimensions.get('window').width,
    height: 200,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1
  }, 
  avatar: {
    padding: 5,
    flex: 1,
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
  },
  content: {
    paddingTop: 22,
    paddingLeft: 20,
    flex: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
})