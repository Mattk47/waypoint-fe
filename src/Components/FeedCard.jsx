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
import { useNavigation } from '@react-navigation/native'

const FeedCard = ({ route, hideName }) => {
  const navigation = useNavigation()
  let { _id, title, description, user_id, coords, createdAt, likes } =
    route.item

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
  const [routeLikes, setRouteLikes] = useState(likes)

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
      {!hideName && (
        <Pressable
          onPress={() =>
            navigation.navigate('UserProfile', { user_id: user_id._id })
          }
        >
          <View style={FeedCardStyles.userContainer}>
            <Image
              style={FeedCardStyles.avatar}
              source={{
                uri: user_id.avatar_url,
              }}
              resizeMode="cover"
            />
            <Text style={FeedCardStyles.username}>{user_id.username}</Text>
          </View>
        </Pressable>
      )}
      <Text style={FeedCardStyles.title}>{title}</Text>
      <MapView
        onPress={() =>
          navigation.navigate('Post', {
            route_id: _id,
          })
        }
        style={FeedCardStyles.map}
        region={region}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        mapPadding={{
          top: 30,
          right: 30,
          bottom: 30,
          left: 30,
        }}
        legalLabelInsets={{
          bottom: -30,
        }}
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
        <Pressable
          onPress={() =>
            navigation.navigate('Comments', {
              route_id: _id,
            })
          }
          style={{ paddingBottom: 5, paddingTop: 5 }}
        >
          <Text style={{ fontWeight: 'bold' }}>View all comments</Text>
        </Pressable>
        <Text style={{ paddingBottom: 5 }}>{getTimeSince(createdAt)}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <LikeButton setLikes={setRouteLikes} route_id={_id} />
          <Text style={{ marginLeft: 10 }}>{`${routeLikes} likes`}</Text>
        </View>
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

  const latitudeDelta = maxLat - minLat
  const longitudeDelta = maxLong - minLong

  return {
    latitudeDelta,
    longitudeDelta,
    centreLat: latitudeDelta / 2 + minLat,
    centreLong: longitudeDelta / 2 + minLong,
  }
}
