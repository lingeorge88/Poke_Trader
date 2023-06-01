import React from 'react';
import ReactPlayer from 'react-player';

function AudioPlayer() {
  return (
    <ReactPlayer
      url="/Users/GeorgeBigballer/Desktop/Bootcamp-files/Poke_Trader/client/src/assets/opening.mp3"
      controls={false}
      playing={true}
      volume={0.8}
      width="100%"
      height="50px"
    />
  );
}

export default AudioPlayer;