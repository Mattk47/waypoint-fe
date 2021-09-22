import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'


const FollowerCard = ({ follower }) => {
    

    let user



    if (follower.item.follower_id.username) {
        user = follower.item.follower_id.username
    } else {
        user = follower.item.followed_id.username
    }

    return (
        <View style={followerCardStyles.container}>
            <View style={followerCardStyles.userContainer}>

                <Text style={{ fontWeight: 'bold', marginRight: 10, paddingTop: 2 }}>
                    {user}
                </Text>
            </View>
        </View>
    )
}

export default FollowerCard

const followerCardStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    userContainer: {
        width: Dimensions.get('window').width,
        paddingLeft: 15,
        paddingBottom: 10,
        flexDirection: 'row',
    }
})
