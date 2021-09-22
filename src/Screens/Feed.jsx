import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { getAllRoutes } from '../../api'
import { RouteFeedContext } from '../../contexts'
import FeedCard from '../Components/FeedCard'

export default Feed = ({ route, user_id, hideName, setPostCount }) => {
  // const [routes, setRoutes] = useState([])
  const { routes, setRoutes } = useContext(RouteFeedContext)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { refresh } = route.params || { refresh: false }
  refresh && setPage(1)

  useEffect(() => {
    getAllRoutes(page, user_id)
      .then(({ routes, totalPages, totalResults }) => {
        setTotalPages(totalPages)
        // setPostCount && setPostCount(totalResults)
        page === 1
          ? setRoutes(routes)
          : setRoutes((curr) => {
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
