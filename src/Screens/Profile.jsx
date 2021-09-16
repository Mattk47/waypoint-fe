import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'

export default Profile = ({ navigation }) => {
  return (
    <View style={ProfileStyles.card}>
      <View style={ProfileStyles.rowOne}>
        <Image
          style={ProfileStyles.avatar}
          source={{
            uri: 'https://www.computerhope.com/jargon/g/guest-user.jpg',
          }}
          resizeMode="contain"
        />
        <View style={ProfileStyles.content}>
          <Text style={ProfileStyles.text}>firstName lastName</Text>
          <View style={ProfileStyles.counters}>
            <Pressable>
              <View style={ProfileStyles.counter}>
                <Text style={ProfileStyles.label}>Posts</Text>
                <Text style={ProfileStyles.numberOf}>5</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Followers')}>
              <View style={ProfileStyles.counter}>
                <Text style={ProfileStyles.label}>Followers</Text>
                <Text style={ProfileStyles.numberOf}>50</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Following')}>
              <View style={[ProfileStyles.counter, { borderRightWidth: 0 }]}>
                <Text style={ProfileStyles.label}>Following</Text>
                <Text style={ProfileStyles.numberOf}>50</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <Text style={ProfileStyles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </View>
  )
}

const ProfileStyles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    padding: 15,
  },
  rowOne: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
  },
  avatar: {
    padding: 5,
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counters: {
    flexDirection: 'row',
  },
  counter: {
    paddingRight: 15,
    marginRight: 15,
    borderRightWidth: 1,
    borderRightColor: 'darkgrey',
  },
  label: {},
  numberOf: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})