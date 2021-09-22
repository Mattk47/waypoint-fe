import React from 'react'
import { Button, View, Image, Text, StyleSheet, Dimensions } from 'react-native'

const PopUpWindow = ({ details: { photo, narration }, setWindowOpen }) => {
  return (
    <View style={PopUpWindowStyles.container}>
      {photo && (
        <Image
          style={PopUpWindowStyles.photo}
          source={{
            uri: JSON.parse(photo),
          }}
          resizeMode="cover"
        />
      )}
      {narration && <Text style={PopUpWindowStyles.text}>{narration}</Text>}
      <Button
        title="Close"
        onPress={() => setWindowOpen(false)}
        color="white"
      />
    </View>
  )
}

export default PopUpWindow

const PopUpWindowStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 2,
    paddingBottom: 10,
  },
  photo: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  text: {
    padding: 15,
    color: 'white',
  },
})
