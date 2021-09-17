import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import LikeButton from './LikeButton'
import ViewMoreText from 'react-native-view-more-text'
import { getTimeSince } from '../Utils/helper-function'

const FeedCard = ({ nav, route }) => {
  let { title, description, user_id, coords, createdAt } = route.item

  if (!coords) coords = [{ latitude: 0, longitude: 0 }]
  let path = coords.map((coord) => {
    return { latitude: +coord.latitude, longitude: +coord.longitude }
  })

  const initialRegion = calcDelta(path)

  const [region, setRegion] = useState({
    latitude: initialRegion.centreLat,
    longitude: initialRegion.centreLong,
    latitudeDelta: initialRegion.latitudeDelta,
    longitudeDelta: initialRegion.longitudeDelta,
  })
  const [likes, setLikes] = useState(5)

  function renderViewMore(onPress) {
    return (
      <Text
        onPress={onPress}
        style={{ color: 'darkgrey', fontStyle: 'italic' }}
      >
        View more
      </Text>
    )
  }
  function renderViewLess(onPress) {
    return (
      <Text
        onPress={onPress}
        style={{ color: 'darkgrey', fontStyle: 'italic' }}
      >
        View less
      </Text>
    )
  }

  return (
    <View style={FeedCardStyles.container}>
      <Pressable onPress={() => nav.navigate('UserProfile')}>
        <View style={FeedCardStyles.userContainer}>
          <Image
            style={FeedCardStyles.avatar}
            source={{
              uri: 'https://www.computerhope.com/jargon/g/guest-user.jpg',
            }}
            resizeMode="contain"
          />
          <Text style={FeedCardStyles.username}>{user_id}</Text>
        </View>
      </Pressable>
      <Text style={FeedCardStyles.title}>{title}</Text>
      <MapView
        onPress={() => nav.navigate('Post')}
        style={FeedCardStyles.map}
        region={region}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Polyline
          coordinates={path}
          lineDashPattern={[1]}
          strokeWidth={1}
          strokeColor="red"
        />
      </MapView>
      <View style={FeedCardStyles.content}>
        <ViewMoreText
          numberOfLines={2}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{ textAlign: 'left' }}
        >
          <Text>{description}</Text>
        </ViewMoreText>
        <Text>{`${likes} likes`}</Text>
        <Pressable onPress={() => nav.navigate('Comments')}>
          <Text>View all comments</Text>
        </Pressable>
        <Text>{getTimeSince(createdAt)}</Text>
        <LikeButton setLikes={setLikes} />
      </View>
    </View>
  )
}

export default FeedCard

const FeedCardStyles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  userContainer: {
    width: Dimensions.get('window').width,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  username: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  title: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
})

const calcDelta = (coords) => {
  const zoomPadding = 1.2
  let maxLong = coords[0].longitude,
    minLong = coords[0].longitude
  let maxLat = coords[0].latitude,
    minLat = coords[0].latitude

  for (let point of coords) {
    if (point.longitude > maxLong) maxLong = point.longitude
    if (point.longitude < minLong) minLong = point.longitude
    if (point.latitude > maxLat) maxLat = point.latitude
    if (point.latitude < minLat) minLat = point.latitude
  }

  const latitudeDelta = (maxLat - minLat) * zoomPadding
  const longitudeDelta = (maxLong - minLong) * zoomPadding

  return {
    latitudeDelta,
    longitudeDelta,
    centreLat: latitudeDelta / 2 + minLat,
    centreLong: longitudeDelta / 2 + minLong,
  }
}
