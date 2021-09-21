import React from 'react';
import { Button } from "react-native";


const DefaultButton = ({ buttonText }) => {


    return (
        <Button
            title={buttonText}
            onPress={() => {
                setLiked(false);
                setLikes(curr => curr - 1);
            }}
        >

        </Button>
    )
};

export default DefaultButton;