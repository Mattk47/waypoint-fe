import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { getAllRoutes } from '../../api'
import FeedCard from '../Components/FeedCard'

export default Feed = ({ user_id, hideName }) => {
  const [routes, setRoutes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getAllRoutes(page, user_id)
      .then(({ routes, totalPages }) => {
        setTotalPages(totalPages)
        setRoutes((curr) => {
          return [...new Set([...curr, ...routes])]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [page])

  const renderRoute = (route) => <FeedCard route={route} hideName={hideName} />

  return (
    <FlatList
      data={routes}
      renderItem={renderRoute}
      keyExtractor={(route) => route._id}
      onEndReached={() => {
        if (page < totalPages) setPage((curr) => curr + 1)
      }}
      onEndReachedThreshold={2}
    />
  )
}

const styles = StyleSheet.create({})
