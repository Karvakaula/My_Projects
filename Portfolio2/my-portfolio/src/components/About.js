import React, { useState, useEffect } from 'react';
import './About.css';
import TypingEffect from './Typingeffect'; 
import { TypeAnimation } from 'react-type-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [sectionContent, setSectionContent] = useState({
    about: 'Hey! my name is Leevi Kauranen. Im a second year information - and communication technology student. Im looking for a internship position for summer 2024 where i can get some valuable work experience and develope my skills.',
    skills: 'My skills include html, css, javascript, react, nodejs, node express, mongoDB, mySQL',
    
    
  });
  const [resetAnimation, setResetAnimation] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResetAnimation(true);
  };

  
  const onAnimationComplete = () => {
    setResetAnimation(false);
  };

  return (
    <section id="about">
      <div className="button-container">
        {Object.keys(sectionContent).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="content">
      <p><TypeAnimation
        key={activeTab} // Ensure the key changes when activeTab changes
        sequence={[sectionContent[activeTab]]}
        speed={50}
        onComplete={onAnimationComplete}
        reset={resetAnimation}
        style={{ fontSize: '1em' }}
      /></p>
      </div>
    </section>
  );
};

export default About;
