import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'


export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);

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
      accuracy: Location.Accuracy.Lowest,
      timeInterval: 1000,
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: 'Tracking is active',
        notificationBody: 'REcording your route',
        notificationColor: '#333333',
      }
    });
    console.log('[tracking]', 'started background location task');
  }

  return (
    <View style={styles.container}>
      <Button title='start tracking' onPress={startTracking}/>
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

  console.log(event.data)
});