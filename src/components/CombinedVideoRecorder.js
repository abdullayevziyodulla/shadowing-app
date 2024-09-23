import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import ReactPlayer from 'react-player';

const CombinedVideoRecorder = ({ videoUrl, startTime, endTime }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const interval = setInterval(drawVideosToCanvas, 33); // Approx 30 FPS
    return () => clearInterval(interval);
  }, []);

  const drawVideosToCanvas = () => {
    if (
      canvasRef.current &&
      videoRef.current &&
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      videoRef.current.readyState === 4
    ) {
      const context = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;

      // Clear the canvas
      context.clearRect(0, 0, width, height);

      // Draw the actual video on the top half
      context.drawImage(videoRef.current, 0, 0, width, height / 2);

      // Draw the webcam video on the bottom half
      context.drawImage(
        webcamRef.current.video,
        0,
        height / 2,
        width,
        height / 2
      );
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    recordedChunks.current = [];

    const canvasStream = canvasRef.current.captureStream(30);
    mediaRecorderRef.current = new MediaRecorder(canvasStream, {
      mimeType: 'video/webm; codecs=vp9',
    });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsRecording(false);
    };
  };

  return (
    <div>
      {/* Canvas Element */}
      <canvas ref={canvasRef} width={640} height={960} style={{ display: 'none' }} />

      {/* Video Preview */}
      <div className="canvas-preview">
        <video
          ref={(ref) => {
            if (ref) {
              ref.srcObject = canvasRef.current.captureStream(30);
              ref.play();
            }
          }}
          width={320}
          height={480}
          muted
        />
      </div>

      {/* Hidden Video Player for the Actual Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />

      {/* Webcam Component */}
      <Webcam
        audio={false}
        ref={webcamRef}
        width={320}
        height={240}
        style={{ display: 'none' }}
      />

      {/* Recording Controls */}
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>

      {/* Download Link */}
      {downloadUrl && (
        <div>
          <h3>Your Recording</h3>
          <video src={downloadUrl} controls width={320} height={480} />
          <a href={downloadUrl} download="recording.webm">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default CombinedVideoRecorder;
