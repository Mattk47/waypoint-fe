import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getPoiByRouteById, getRouteById } from '../../api.js'
import PopUpWindow from '../Components/PopUpWindow.jsx'

export default function Post({ route }) {
  const [post, setPost] = useState({
    coords: [{ latitude: 0, longitude: 0 }],
  })
  const [points, setPoints] = useState([])
  const [pointDetails, setPointDetails] = useState()
  const [windowOpen, setWindowOpen] = useState(false)
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

  const popupWindow = (poiObj) => {
    if (!windowOpen) {
      setWindowOpen(true)
      setPointDetails(poiObj)
    }
  }

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
        scrollEnabled={!windowOpen}
        zoomEnabled={!windowOpen}
        rotateEnabled={!windowOpen}
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
        <Marker key="start" coordinate={path[0]} pinColor="green" />
        {points.length > 0 &&
          points.map((point, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: point.coords.latitude,
                  longitude: point.coords.longitude,
                }}
                pinColor="blue"
                onPress={() => popupWindow(point)}
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
      {windowOpen && (
        <PopUpWindow details={pointDetails} setWindowOpen={setWindowOpen} />
      )}
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
