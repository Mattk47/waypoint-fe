import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList } from 'react-native'
import { getFollowersById } from '../../api'
import FollowerCard from '../Components/FollowerCard'

const Followers = ({ route }) => {
  const [followers, setFollowers] = useState([])

  const { user_id } = route.params;
  useEffect(() => {
    getFollowersById(user_id)
      .then(({ followers }) => {
        setFollowers(followers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const renderRoute = (follower) => <FollowerCard follower={follower}></FollowerCard>

  return (
    <View>
      {followers.length > 0 && (
        <FlatList
          data={followers}
          renderItem={renderRoute}
          keyExtractor={(follower) => follower._id}
        />
      )}
    </View>
  )
}
export default Followers