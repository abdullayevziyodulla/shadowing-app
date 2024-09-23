import React from 'react';

const Transcript = ({ text, onWordClick }) => {
  const words = text.split(/\s+/).map((word, index) => (
    <span
      key={index}
      onClick={() => onWordClick(word)}
      className="transcript-word"
    >
      {word}{' '}
    </span>
  ));

  return <div>{words}</div>;
};

export default Transcript;
