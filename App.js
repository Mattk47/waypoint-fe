import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Polyline } from 'react-native-maps'



const locationStorageName = 'locations'

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationsState, setLocationsState] = useState([])
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })()
  }, [])

  useEffect(() => {
    getLocations().then(locations => {setLocationsState(locations)});
    const timerId = window.setInterval(() => {
      getLocations().then(locations => {
        if(locations.length !== locationsState.length) {
          console.log(locations);
          setLocationsState(locations)
        }
      })
    }, 5000);
    return () => window.clearInterval(timerId);
  }, []);

  const startTracking = async () => {
    await Location.startLocationUpdatesAsync('bgLocation', {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 10000,
      distanceInterval: 20,
      foregroundService: {
        notificationTitle: 'Tracking is active',
        notificationBody: 'REcording your route',
        notificationColor: '#333333',
      },
      activityType: Location.ActivityType.Fitness,
      showsBackgroundLocationIndicator: true
    });
    console.log('[tracking]', 'started background location task');
  }

  const stopTracking = async () => {
    await Location.stopLocationUpdatesAsync('bgLocation');
    console.log('[tracking]', 'stopped background location task');
    await AsyncStorage.clear();
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        region={
          locationsState.length > 0 ?
          {
            latitude: locationsState[locationsState.length-1].coords.latitude, 
            longitude: locationsState[locationsState.length-1].coords.longitude
          }
          :
          {latitude: 53.558297, longitude: -1.635262, latitudeDelta: 9, longitudeDelta: 9}
        }
      >
        {locationsState.length > 0 && <Marker coordinate={{latitude: locationsState[locationsState.length-1].coords.latitude, longitude: locationsState[locationsState.length-1].coords.longitude}}/>}
        {locationsState.length > 0 && <Polyline coordinates={getPolyline(locationsState)}/>}
      </MapView>
      <Button title='start tracking' onPress={startTracking}/>
      {/* <Button title='log' onPress={logLocations}/> */}
      <Button title='stop tracking' onPress={stopTracking}/>
    </View>
  );
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

TaskManager.defineTask('bgLocation', async (event) => {
  if (event.error) {
    return console.error('[tracking]', 'Something went wrong within the background location task...', event.error);
  }

  // console.log(event.data)
  const locations = event.data.locations
  try {
    for (const location of locations) {
      await addLocation(location);
    }
  } catch (error) {
    console.log('[tracking]', 'Something went wrong when saving a new location...', error);
  }
});

const addLocation = async (location) => {
  const existing = await getLocations();
  const locations = [...existing, location];
  await setLocations(locations);
  console.log('[storage]', 'added location -', locations.length, 'stored locations');
  return locations
}

const getLocations = async () => {
  const data = await AsyncStorage.getItem(locationStorageName);
  return data ? JSON.parse(data) : [];
}

const setLocations = async (locations) => {
  await AsyncStorage.setItem(locationStorageName, JSON.stringify(locations));
}

const logLocations = async () => {
  let json = await getLocations()
  // console.log(json)
}

const getPolyline = (locations) => {
    return locations.map(({ coords: { latitude, longitude } }) => {
      return { latitude, longitude }
  })
}
