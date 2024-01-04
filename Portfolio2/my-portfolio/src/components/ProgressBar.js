// ProgressBar.js

import React, { useState, useEffect } from 'react';

const ProgressBar = ({ proficiency }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animationDuration = 1000; // 1000ms or 1 second
    const step = (proficiency / animationDuration) * 10;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress + step >= proficiency) {
          clearInterval(interval);
          return proficiency;
        }
        return prevProgress + step;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [proficiency]);

  return (
    <div className="progress-bar" style={{ width: '100px' }}>
      <div className="progress" style={{ width: `${progress}%` }}>
        <p>{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
