"use client"
import React, { useEffect } from 'react';

const MyComponent: React.FC = () => {
  function speak() {
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance('Welcome to this tutorial!');

    // Select a voice
    const voices = speechSynthesis.getVoices();
    console.log(voices[97])
    utterance.voice = voices[97]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
  }

  return (
    <div>
      
      <button onClick={speak}>free</button>
    </div>
  );
};

export default MyComponent;
