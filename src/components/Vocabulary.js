import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vocabulary = ({ word }) => {
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const meanings = response.data[0].meanings;
        setDefinition(meanings[0].definitions[0].definition);
      } catch (error) {
        setDefinition('Definition not found.');
      }
    };

    fetchDefinition();
  }, [word]);

  return (
    <div>
      <h3>{word}</h3>
      <p>
        <strong>Definition:</strong> {definition}
      </p>
    </div>
  );
};

export default Vocabulary;
