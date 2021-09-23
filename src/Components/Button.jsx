import React from 'react';
import { Pressable, Text, View } from 'react-native'

const DefaultButton = ({
  buttonText,
  disabled,
  onPressFunc,
  styleOverride,
}) => {
  return (
    <View
      style={{
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        justifyContents: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable
        style={{
          borderRadius: 20,
          padding: 10,
          elevation: 2,
          backgroundColor: 'rgb(70, 184, 159)',
          width: 100,
        }}
        onPress={onPressFunc}
        disabled={disabled}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {buttonText}
        </Text>
      </Pressable>
    </View>
  )
}

export default DefaultButton;