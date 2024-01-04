import React, { useState, useEffect} from 'react';
import './Header.css';
import { TypeAnimation } from 'react-type-animation';
const TypingEffect = ({ text, delay, type}) => {
  const [currentText, setCurrentText] = useState(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);
  if (type === "h1"){
    return <h1>{currentText}</h1>;
  }
  else{
    return <p>{currentText}</p>;
  }
}

const Header = () => {
  return (
    
    <header id="header">
        <div className='container'>
            <TypingEffect text="Leevi Kauranen" delay={90} type="h1" />
            <TypingEffect text="Upcoming ICT engineer" delay={100}  type="p"/>
        </div>
        
    </header>
  );
};

export default Header;
