import React from 'react';
import { Skill } from '../types';

interface StickmanRunnerProps {
  skills: Skill[];
}

const StickmanRunner: React.FC<StickmanRunnerProps> = ({ skills }) => {
  const generateKeyframes = () => {
    let keyframes = '';
    const totalSteps = skills.length;
    const stepDuration = 100 / totalSteps; 

    skills.forEach((skill, index) => {
      const startTime = index * stepDuration;
      const endTime = (index + 1) * stepDuration;
      
      // Calculate vertical position
      // We assume the container is the wrapper of the list.
      // Each item takes up 1/Nth of the height.
      // The bar is roughly at the bottom of the text.
      // We use a percentage-based offset for the row start, plus a fixed pixel offset for the bar.
      // Image is 60px high. Line is at ~42px. We want bottom of image at line.
      // So top should be 42 - 60 = -18px.
      const rowHeightPercent = 100 / skills.length;
      const topPos = `calc(${index * rowHeightPercent}% - 18px)`; 
      const nextTopPos = `calc(${(index + 1) * rowHeightPercent}% - 18px)`;

      // Horizontal positions
      // Start at 0 for the first one.
      // For subsequent ones, start where the previous one ended (to simulate "dropping" from that point).
      const prevWidth = index > 0 ? skills[index - 1].A : 0;
      const startX = index === 0 ? 0 : prevWidth;
      const endX = skill.A;

      // 1. Run along the line
      keyframes += `
        ${startTime}% { top: ${topPos}; left: ${startX}%; opacity: 1; transform: scale(1); }
        ${startTime + (stepDuration * 0.4)}% { top: ${topPos}; left: ${endX}%; opacity: 1; transform: scale(1); }
      `;
      
      // 2. Drop to next line (if not last)
      if (index < skills.length - 1) {
         keyframes += `
            ${endTime}% { top: ${nextTopPos}; left: ${endX}%; opacity: 1; transform: scale(1); }
         `;
      } else {
         // Last item: fade out
         keyframes += `
            ${endTime}% { top: ${topPos}; left: ${endX}%; opacity: 0; transform: scale(0); }
         `;
      }
    });
    
    // Loop back to start
    keyframes += `100% { top: -18px; left: 0%; opacity: 0; transform: scale(0); }`;

    return keyframes;
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <style>{`
        @keyframes stickmanRun {
          ${generateKeyframes()}
        }
        .stickman {
          position: absolute;
          width: 60px;
          height: 60px;
          background-image: url('/runner-icon.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          /* border-radius: 50%; remove border radius if it cuts off the image */
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
          animation: stickmanRun 10s linear infinite;
          will-change: top, left;
          z-index: 20;
        }
      `}</style>
      <div className="stickman"></div>
    </div>
  );
};

export default StickmanRunner;
