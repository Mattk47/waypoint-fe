import React from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, Pressable } from "react-native";
import FeedCard from '../Components/FeedCard';

export default Feed = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <FeedCard nav={navigation}/>
      <FeedCard nav={navigation}/>
      <FeedCard nav={navigation}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

});