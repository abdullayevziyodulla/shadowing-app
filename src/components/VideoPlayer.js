import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, startTime, endTime, repeatCount }) => {
  const playerRef = useRef(null);
  const currentRepeat = useRef(0);
  const [playing, setPlaying] = useState(true);

  const handleProgress = (state) => {
    if (state.playedSeconds >= endTime) {
      currentRepeat.current += 1;
      if (currentRepeat.current < repeatCount) {
        playerRef.current.seekTo(startTime);
      } else {
        setPlaying(false); // Pauses the video
        currentRepeat.current = 0; // Reset for next play
      }
    }
  };

  useEffect(() => {
    // Reset repeat count and start playing when dependencies change
    currentRepeat.current = 0;
    setPlaying(true); // Ensure the video starts playing
  }, [url, startTime, endTime, repeatCount]);

  return (
    <div className="video-player">
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={true}
        playing={playing}
        onProgress={handleProgress}
        config={{
          youtube: {
            playerVars: {
              start: startTime,
              end: endTime,
            },
          },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
