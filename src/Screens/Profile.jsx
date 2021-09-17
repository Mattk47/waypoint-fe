import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import { getUser } from '../../api'

export default Profile = ({ navigation }) => {
  const [user, setUser] = useState({})

  let username = 'Hudson_Ankunding'

  useEffect(() => {
    getUser(username)
      .then(({ user }) => {
        navigation.setOptions({ title: user.username })
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const { name, bio, avatar_url } = user

  return (
    <View style={ProfileStyles.card}>
      <View style={ProfileStyles.rowOne}>
        <Image
          style={ProfileStyles.avatar}
          source={{
            uri: avatar_url,
          }}
          resizeMode="contain"
        />
        <View style={ProfileStyles.content}>
          <Text style={ProfileStyles.text}>{name}</Text>
          <View style={ProfileStyles.counters}>
            <Pressable>
              <View style={ProfileStyles.counter}>
                <Text style={ProfileStyles.label}>Posts</Text>
                <Text style={ProfileStyles.numberOf}>5</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Followers')}>
              <View style={ProfileStyles.counter}>
                <Text style={ProfileStyles.label}>Followers</Text>
                <Text style={ProfileStyles.numberOf}>50</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Following')}>
              <View style={[ProfileStyles.counter, { borderRightWidth: 0 }]}>
                <Text style={ProfileStyles.label}>Following</Text>
                <Text style={ProfileStyles.numberOf}>50</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <Text style={ProfileStyles.bio}>{bio}</Text>
    </View>
  )
}

const ProfileStyles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    padding: 15,
  },
  rowOne: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
  },
  avatar: {
    padding: 5,
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counters: {
    flexDirection: 'row',
  },
  counter: {
    paddingRight: 15,
    marginRight: 15,
    borderRightWidth: 1,
    borderRightColor: 'darkgrey',
  },
  label: {},
  numberOf: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
