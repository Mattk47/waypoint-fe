import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native'
import { getCommentsByRoute, postCommentsByRoute } from '../../api'
import { AppUserContext } from '../../contexts'
import CommentCard from '../Components/CommentCard'

const Comments = ({ route }) => {
  const [text, setText] = useState('')
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const {
    appUser: { user_id, username, avatar_url },
  } = useContext(AppUserContext)
  const { route_id } = route.params

  useEffect(() => {
    getCommentsByRoute(page, route_id)
      .then(({ comments, totalPages }) => {
        setTotalPages(totalPages)
        setComments((curr) => {
          return [...new Set([...curr, ...comments])]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [page])

  const postComment = () => {
    const commentObj = {
      body: text,
      user_id,
    }
    console.log(route_id, commentObj)
    postCommentsByRoute(route_id, commentObj).then(({ comment }) => {
      comment.user_id = { username, avatar_url }
      setText('')
      setComments((currentComments) => {
        return [comment, ...currentComments]
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  const renderRoute = (comment) => <CommentCard comment={comment} />

  return (
    <View style={CommentsStyles.container}>
      {comments.length > 0 && (
        <FlatList
          data={comments}
          renderItem={renderRoute}
          keyExtractor={(comment) => comment._id}
          onEndReached={() => {
            if (page < totalPages) setPage((curr) => curr + 1)
          }}
        />
      )}
      <View style={CommentsStyles.footer}>
        <TextInput
          style={CommentsStyles.input}
          placeholder="Add comment"
          onChangeText={setText}
          value={text}
          maxLength={140}
        />
        {/* <Button
          style={CommentsStyles.button}
          title="Send"
          onPress={postComment}
          disabled={text === '' || !user_id}
        /> */}
        <Pressable
          style={{
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            backgroundColor: 'rgb(70, 184, 159)',
            width: 75,
          }}
          onPress={postComment}
          disabled={text === ''}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Comments

const CommentsStyles = StyleSheet.create({
  input: {
    width: '75%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'darkgrey',
    marginRight: 5,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    // bottom: 75,
  },
  send: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    // padding: 15,
  },
  footer: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    height: 60,
    top: Dimensions.get('window').height - 230,
    width: Dimensions.get('window').width,
  },
})
