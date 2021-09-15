import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline } from 'react-native-maps';
import testRoute from '../../assets/gpx-testdata';


export default Feed = () => {
  const initialRegion = calcDelta(testRoute);

  const [region, setRegion] = useState({
    latitude: initialRegion.centreLat, 
    longitude: initialRegion.centreLong, 
    latitudeDelta: initialRegion.latitudeDelta, 
    longitudeDelta: initialRegion.longitudeDelta
  });

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <Text>Time</Text>
      <Text>Title</Text>
      <MapView style={styles.map} region={region}>
        <Polyline coordinates={testRoute} lineDashPattern={[1]} strokeWidth={2}/>
      </MapView>
      <Text>Time</Text>
      <Text>Comments</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
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