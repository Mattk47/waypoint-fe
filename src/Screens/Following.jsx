import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList } from 'react-native'
import { getFollowingById } from '../../api'
import FollowerCard from '../Components/FollowerCard'

const Following = ({ route }) => {
  const [following, setFollowing] = useState([])

  const { user_id } = route.params;
  useEffect(() => {
    getFollowingById(user_id)
      .then(({ following }) => {
        setFollowing(following)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const renderRoute = (follower) => <FollowerCard follower={follower}></FollowerCard>

  return (
    <View>
      {following.length > 0 && (
        <FlatList
          data={following}
          renderItem={renderRoute}
          keyExtractor={(followed) => followed._id}
        />
      )}
    </View>
  )
}
export default Following