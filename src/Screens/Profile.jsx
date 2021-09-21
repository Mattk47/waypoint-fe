import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native'
import { getAllRoutes, getUser } from '../../api'
import { AppUserContext } from '../../contexts'
import FeedCard from '../Components/FeedCard'
import Feed from './Feed'

export default Profile = ({ route, navigation }) => {
  const { appUser } = useContext(AppUserContext)
  const { user_id } = route.params || appUser

  const [user, setUser] = useState({})
  const [userRoutes, setUserRoutes] = useState([])
  const [postCount, setPostCount] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getUser(user_id)
      .then(({ user }) => {
        navigation.setOptions({ title: user.username })
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
    getAllRoutes(page, user_id)
      .then(({ routes, totalPages, totalResults }) => {
        setTotalPages(totalPages)
        setPostCount(totalResults)
        setUserRoutes((curr) => {
          return [...new Set([...curr, ...routes])]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [page])

  const { name, bio, avatar_url } = user
  const follow = Math.ceil(Math.random() * 500)
  const max = Math.floor(follow * 1.1)
  const min = Math.ceil(follow * 0.9)

  const renderRoute = (route) => <FeedCard route={route} />

  return (
    <ScrollView style={ProfileStyles.card}>
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
      <View style={{ borderBottomWidth: 1, borderColor: 'darkgrey' }}>
        <Text style={ProfileStyles.bio}>{bio}</Text>
      </View>
      <FlatList
        data={userRoutes}
        renderItem={renderRoute}
        keyExtractor={(route) => route._id}
        onEndReached={() => {
          if (page < totalPages) setPage((curr) => curr + 1)
        }}
        onEndReachedThreshold={2}
      />
    </ScrollView>
  )
}

const ProfileStyles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    // borderTopWidth: 1,
    // padding: 15,
    // marginBottom: 10,
  },
  rowOne: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    // marginBottom: 10,
    padding: 15,
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
  bio: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
  },
})
