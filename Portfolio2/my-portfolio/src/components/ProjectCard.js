// ProjectCard.js

import React from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css'; 
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p>{}</p>
    </motion.div>
  );
};

export default ProjectCard;
