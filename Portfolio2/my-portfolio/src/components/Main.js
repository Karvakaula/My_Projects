
import React from 'react';
import './Main.css';

const Main = ({ children }) => {
    return (
        <main className="main">
          <div className="border-animation" />
          {children}
        </main>
      );
};

export default Main;
