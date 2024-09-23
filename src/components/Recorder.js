import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const Recorder = () => {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsBlocked(false);
        recorder
          .start()
          .then(() => {
            setIsRecording(true);
          })
          .catch((e) => console.error(e));
      })
      .catch(() => {
        console.log('Permission Denied');
        setIsBlocked(true);
      });
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {isBlocked ? (
        <p>Please allow microphone access to use the recorder.</p>
      ) : (
        <div>
          <button onClick={startRecording} disabled={isRecording}>
            Start Recording
          </button>
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop Recording
          </button>
        </div>
      )}
      {blobURL && (
        <div>
          <h3>Your Recording</h3>
          <audio src={blobURL} controls="controls" />
        </div>
      )}
    </div>
  );
};

export default Recorder;
