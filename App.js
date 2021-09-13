import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import AsyncStorage from '@react-native-async-storage/async-storage';

const locationStorageName = 'locations'

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [route, setRoute] = useState([])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })()
  }, [])

  const startTracking = async () => {
    await Location.startLocationUpdatesAsync('bgLocation', {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 3 * 1000,
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: 'Tracking is active',
        notificationBody: 'REcording your route',
        notificationColor: '#333333',
      }
    });
    console.log('[tracking]', 'started background location task');
  }

  const stopTracking = async () => {
    await Location.stopLocationUpdatesAsync('bgLocation');
    console.log('[tracking]', 'stopped background location task');
  }

  return (
    <View style={styles.container}>
      <Button title='start tracking' onPress={startTracking}/>
      <Button title='log' onPress={() => console.log(route)}/>
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