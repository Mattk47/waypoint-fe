import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { getAllRoutes } from '../../api'
import FeedCard from '../Components/FeedCard'

export default Feed = () => {
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    getAllRoutes()
      .then(({ routes }) => {
        setRoutes([routes[0], routes[1], routes[2]])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const renderRoute = (route) => <FeedCard route={route} />

  return (
    <FlatList
      data={routes}
      renderItem={renderRoute}
      keyExtractor={(route) => route._id}
    />
  )
}

const styles = StyleSheet.create({})
