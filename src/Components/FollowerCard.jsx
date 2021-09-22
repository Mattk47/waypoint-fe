import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'


const FollowerCard = ({ follower }) => {
    let {
        _id,
        'follower_id': { username }
    } = follower.item

    return (
        <View style={followerCardStyles.container}>
            <View style={followerCardStyles.userContainer}>

                <Text style={{ fontWeight: 'bold', marginRight: 10, paddingTop: 2 }}>
                    {username}
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
