import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import { getUser } from '../../api'
import { AppUserContext } from '../../contexts'
import Feed from './Feed'

export default Profile = ({ route, navigation }) => {
  const { appUser } = useContext(AppUserContext)
  const { user_id } = route.params || appUser
  const [user, setUser] = useState({})
  const [postCount, setPostCount] = useState(0)

  useEffect(() => {
    getUser(user_id)
      .then(({ user }) => {
        navigation.setOptions({ title: user.username })
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const { name, bio, avatar_url } = user
  const follow = Math.ceil(Math.random() * 500)
  const max = Math.floor(follow * 1.1)
  const min = Math.ceil(follow * 0.9)

  return (
    <>
      <View style={ProfileStyles.card}>
        <View style={ProfileStyles.rowOne}>
          <Image
            style={ProfileStyles.avatar}
            source={{
              uri: avatar_url,
            }}
            resizeMode="cover"
          />
          <View style={ProfileStyles.content}>
            <Text style={ProfileStyles.text}>{name}</Text>
            <View style={ProfileStyles.counters}>
              <Pressable>
                <View style={ProfileStyles.counter}>
                  <Text style={ProfileStyles.label}>Posts</Text>
                  <Text style={ProfileStyles.numberOf}>{postCount}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Followers')}>
                <View style={ProfileStyles.counter}>
                  <Text style={ProfileStyles.label}>Followers</Text>
                  <Text style={ProfileStyles.numberOf}>{follow}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Following')}>
                <View style={[ProfileStyles.counter, { borderRightWidth: 0 }]}>
                  <Text style={ProfileStyles.label}>Following</Text>
                  <Text style={ProfileStyles.numberOf}>
                    {Math.floor(Math.random() * (max - min + 1) + min)}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <Text style={ProfileStyles.bio}>{bio}</Text>
      </View>
      <Feed user_id={user_id} hideName={true} setPostCount={setPostCount} />
    </>
  )
}

const ProfileStyles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    // borderTopWidth: 1,
    padding: 15,
    // marginBottom: 10,
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
