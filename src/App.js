import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Transcript from './components/Transcript';
import Vocabulary from './components/Vocabulary';
import Recorder from './components/Recorder';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);
  const [repeatCount, setRepeatCount] = useState(1);
  const [transcript, setTranscript] = useState('');
  const [selectedWord, setSelectedWord] = useState('');

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(parseInt(e.target.value));
  };

  const handleEndTimeChange = (e) => {
    setEndTime(parseInt(e.target.value));
  };

  const handleRepeatCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setRepeatCount(1);
    } else {
      setRepeatCount(value);
    }
  };

  const handleTranscriptChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleWordClick = (word) => {
    setSelectedWord(word.replace(/[^a-zA-Z]/g, '').toLowerCase());
  };

  return (
    <div className="container">
      <h1>Shadowing Practice</h1>

      {/* Video Input Section */}
      <div className="video-input">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={videoUrl}
          onChange={handleUrlChange}
        />
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Video Section */}
        {videoUrl && (
          <div className="video-section">
            <VideoPlayer
              url={videoUrl}
              startTime={startTime}
              endTime={endTime}
              repeatCount={repeatCount}
            />

            {/* Settings Below Video */}
            <div className="video-settings">
              <div className="setting">
                <label>Start Time (seconds): </label>
                <input
                  type="number"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  min="0"
                />
              </div>
              <div className="setting">
                <label>End Time (seconds): </label>
                <input
                  type="number"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  min="0"
                />
              </div>
              <div className="setting">
                <label>Repeat Count: </label>
                <input
                  type="number"
                  value={repeatCount}
                  onChange={handleRepeatCountChange}
                  min="1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Controls and Transcript Section */}
        <div className="controls-section">
          {/* Transcript Input */}
          <div className="transcript-input">
            <h2>Transcript</h2>
            <textarea
              placeholder="Paste the transcript here..."
              value={transcript}
              onChange={handleTranscriptChange}
            ></textarea>
          </div>

          {/* Display Transcript */}
          {transcript && (
            <div className="transcript-container">
              <h2>Click on a word to see its definition and proficiency level:</h2>
              <Transcript text={transcript} onWordClick={handleWordClick} />
            </div>
          )}

          {/* Vocabulary Display */}
          {selectedWord && (
            <div className="vocabulary-container">
              <Vocabulary word={selectedWord} />
            </div>
          )}

          {/* Recorder */}
          <div className="recorder-container">
            <h2>Record Yourself</h2>
            <Recorder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
