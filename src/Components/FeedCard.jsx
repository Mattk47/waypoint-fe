import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import MapView, { Polyline } from 'react-native-maps';
import testRoute from '../../assets/gpx-testdata';
import LikeButton from './LikeButton';

const FeedCard = ({ nav }) => {
  const initialRegion = calcDelta(testRoute);

  const [region, setRegion] = useState({
    latitude: initialRegion.centreLat, 
    longitude: initialRegion.centreLong, 
    latitudeDelta: initialRegion.latitudeDelta, 
    longitudeDelta: initialRegion.longitudeDelta
  });
  const [likes, setLikes] = useState(5);

  return (
    <View style={FeedCardStyles.container}>
      <Pressable onPress={() => nav.navigate('UserProfile')}>
        <Text style={FeedCardStyles.username}>Username</Text>
      </Pressable>
      <MapView
        onPress={() => nav.navigate('Post')}
        style={FeedCardStyles.map}
        region={region}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Polyline
          coordinates={testRoute}
          lineDashPattern={[1]}
          strokeWidth={1}
          strokeColor="red"
        />
      </MapView>
      <View style={FeedCardStyles.content}>
        <Text>Saturday 10th Sept 2021</Text>
        <Text>Title</Text>
        <Text numberOfLines={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text>{`${likes} likes`}</Text>
        <Text>Comments</Text>
        <LikeButton setLikes={setLikes} />
      </View>
    </View>
  )
};

export default FeedCard;

const FeedCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
  username: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
});

const calcDelta = (coords) => {
  const zoomPadding = 1.2
  let maxLong = coords[0].longitude, minLong = coords[0].longitude
  let maxLat = coords[0].latitude, minLat = coords[0].latitude

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
    centreLat: (latitudeDelta / 2) + minLat,
    centreLong: (longitudeDelta / 2) + minLong
  }
}