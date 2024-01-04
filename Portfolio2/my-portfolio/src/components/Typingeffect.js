import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingEffect = ({ text, delay, type }) => {
  const [currentText, setCurrentText] = useState('');
    
  useEffect(() => {
    setCurrentText(''); // Reset currentText when the text prop changes

    let currentIndex = -1;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setCurrentText((prevText) => prevText + (text[currentIndex] || ''));
        currentIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  if (type === 'h1') {
    return <h1>{currentText}</h1>;
  } else {
    return <p>{currentText}</p>;
  }
};

export default TypingEffect;
