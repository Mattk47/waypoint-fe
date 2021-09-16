import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import { useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps'
import gpxjson from '../../assets/gpx-testdata.js'
import poiData from '../../assets/poi-textdata.js'

export default function App() {
  const initialRegion = calcDelta(gpxjson)

  const [region, setRegion] = useState({
    latitude: initialRegion.centreLat,
    longitude: initialRegion.centreLong,
    latitudeDelta: initialRegion.latitudeDelta,
    longitudeDelta: initialRegion.longitudeDelta,
  })

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker key="start" coordinate={gpxjson[0]} pinColor="green" />
        {poiData.map((poi, i) => {
          return <Marker key={i} coordinate={poi} pinColor="blue" />
        })}
        <Marker
          key="finish"
          coordinate={gpxjson[gpxjson.length - 1]}
          pinColor="red"
        />
        <Polyline
          coordinates={gpxjson}
          lineDashPattern={[1]}
          strokeColor="red"
        />
      </MapView>
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
    height: Dimensions.get('window').height * 0.9,
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