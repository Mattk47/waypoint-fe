import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import { getTimeSince } from '../Utils/helper-function'

const CommentCard = ({ comment }) => {
  let {
    _id,
    body,
    createdAt,
    user_id: { username, avatar_url },
  } = comment.item

  return (
    <View style={CommentCardStyles.container}>
      <View style={CommentCardStyles.userContainer}>
        <Image
          style={CommentCardStyles.avatar}
          source={{
            uri: avatar_url,
          }}
          resizeMode="cover"
        />
        <Text style={{ fontWeight: 'bold', marginRight: 10, paddingTop: 2 }}>
          {username}
        </Text>
        <Text style={{ color: 'darkgrey', paddingTop: 2 }}>
          {getTimeSince(createdAt)}
        </Text>
      </View>
      <Text style={CommentCardStyles.content}>{body}</Text>
    </View>
  )
}

export default CommentCard

const CommentCardStyles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'darkgrey',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  userContainer: {
    width: Dimensions.get('window').width,
    paddingLeft: 15,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  avatar: {
    borderWidth: 0.5,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    // paddingTop: 10,
  },
})
