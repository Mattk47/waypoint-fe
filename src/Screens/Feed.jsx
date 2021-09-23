import React, { useContext, useEffect, useState, useCallback } from 'react'
import { StyleSheet, FlatList, RefreshControl, StatusBar } from 'react-native'
import { getAllRoutes } from '../../api'
import { RouteFeedContext } from '../../contexts'
import FeedCard from '../Components/FeedCard'
import AnimatedLoader from 'react-native-animated-loader'

export default Feed = ({ route, user_id, hideName, setPostCount }) => {
  // const [routes, setRoutes] = useState([])
  const { routes, setRoutes } = useContext(RouteFeedContext)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const { refresh } = route.params || { refresh: false }
  refresh && setPage(1)

  useEffect(() => {
    setLoading(true)
    getAllRoutes(page, user_id)
      .then(({ routes, totalPages, totalResults }) => {
        setTotalPages(totalPages)
        // setPostCount && setPostCount(totalResults)
        page === 1
          ? setRoutes(routes)
          : setRoutes((curr) => {
              return [...new Set([...curr, ...routes])]
            })
        setInterval(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [page])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setPage(1)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const renderRoute = (route) => <FeedCard route={route} hideName={hideName} />

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(70, 184, 159)" />
      <FlatList
        data={routes}
        renderItem={renderRoute}
        keyExtractor={(route) => route._id}
        onEndReached={() => {
          if (page < totalPages) setPage((curr) => curr + 1)
        }}
        onEndReachedThreshold={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <AnimatedLoader
        visible={loading && page === 1}
        source={require('../../assets/201-simple-loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
    </>
  )
}

const styles = StyleSheet.create({
  lottie: {
    width: 500,
    height: 250,
  },
})

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
