import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'


const LikeButton = ({ setLikes }) => {
  const [liked, setLiked] = useState(false);

  return liked ? (    
      <View>
        <Pressable style={styles.heart} onPress={() => {
          setLiked(false);
          setLikes(curr => curr - 1);
        }}>
          <Octicons name="heart" size={30} color="red" />        
        </Pressable>
      </View>
  ) : (
      <View>
        <Pressable style={styles.heart} onPress={() => {
            setLiked(true);
            setLikes(curr => curr + 1);
          }}>
          <Octicons name="heart" size={30} color="lightgray" />        
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  heart:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 1,  
    elevation: 5
  }
});

export default LikeButton;



