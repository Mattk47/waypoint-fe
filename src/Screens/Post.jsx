import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import gpxjson from '../../assets/gpx-testdata.js'
import poiData from '../../assets/poi-textdata.js'
import { getPoiByRouteById, getRouteById } from '../../api.js'

export default function Post({ route }) {
  const [post, setPost] = useState({
    coords: [{ latitude: 0, longitude: 0 }],
  })
  const [points, setPoints] = useState([])
  const { route_id } = route.params

  useEffect(() => {
    getRouteById(route_id)
      .then(({ route }) => {
        setPost(route)
      })
      .catch((err) => {
        console.log(err)
      })
    getPoiByRouteById(route_id)
      .then(({ pois }) => {
        console.log(pois)
        setPoints(pois)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  let path = post.coords.map((coord) => {
    return { latitude: +coord.latitude, longitude: +coord.longitude }
  })

  const initialRegion = calcDelta(path)

  // const [region, setRegion] = useState({
  //   latitude: initialRegion.centreLat,
  //   longitude: initialRegion.centreLong,
  //   latitudeDelta: initialRegion.latitudeDelta,
  //   longitudeDelta: initialRegion.longitudeDelta,
  // })

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: initialRegion.centreLat,
          longitude: initialRegion.centreLong,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        }}
        // onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker key="start" coordinate={path[0]} pinColor="green" />
        {points.length > 0 &&
          points.map((point, i) => {
            console.log(point._id)
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: point.coords.latitude,
                  longitude: point.coords.longitude,
                }}
                pinColor="blue"
              />
            )
          })}
        <Marker
          key="finish"
          coordinate={path[path.length - 1]}
          pinColor="red"
        />
        <Polyline coordinates={path} lineDashPattern={[1]} strokeColor="red" />
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
