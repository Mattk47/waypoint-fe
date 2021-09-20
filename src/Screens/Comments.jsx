import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Dimensions,
  FlatList,
} from 'react-native'
import { getCommentsByRoute } from '../../api'
import CommentCard from '../Components/CommentCard'

const Comments = ({ route }) => {
  const [text, setText] = useState('')
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
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
        <Button style={CommentsStyles.button} title="Send" />
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
