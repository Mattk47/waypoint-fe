import React, { useState } from 'react';
import { Button } from "react-native";


const LikeButton = ({ setLikes }) => {
  const [liked, setLiked] = useState(false);

  return liked ? (
      <Button
        title={`❤️`}
        onPress={() => {
          setLiked(false);
          setLikes(curr => curr - 1);
        }}
      >
        ❤️
      </Button>
    ) : (
      <Button
        title={`🤍`}
        onPress={() => {
          setLiked(true);
          setLikes(curr => curr + 1);
        }} />
    );
};

export default LikeButton;



