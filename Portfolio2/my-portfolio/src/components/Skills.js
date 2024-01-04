// Skills.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3, faJs, faReact, faPython, faNodeJs  } from '@fortawesome/free-brands-svg-icons';
import './Skills.css'; // Don't forget to create this CSS file for styling
import ProgressBar from './ProgressBar';

const skillsData = [
    {
        name: 'HTML',
        icon: <FontAwesomeIcon icon={faHtml5} />,
        proficiency: 80,
      },
      {
        name: 'CSS',
        icon: <FontAwesomeIcon icon={faCss3} />,
        proficiency: 75,
      },
      {
        name: 'JavaScript',
        icon: <FontAwesomeIcon icon={faJs} />,
        proficiency: 60,
      },
      {
        name: 'React',
        icon: <FontAwesomeIcon icon={faReact} />,
        proficiency: 40,
      },
      {
        name: 'Python',
        icon: <FontAwesomeIcon icon={faPython} />,
        proficiency: 65,
      },
      {
        name: 'NodeJS',
        icon: <FontAwesomeIcon icon={faNodeJs} />,
        proficiency: 65,
      },
      
      
];

const Skills = () => {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-container">
        {skillsData.map((skill, index) => (
          <div key={index} className="skill-item">
            <p className='skill-icon'>{skill.icon}</p>
            <p className="skill-name">{skill.name}</p>
            <ProgressBar proficiency={skill.proficiency} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
