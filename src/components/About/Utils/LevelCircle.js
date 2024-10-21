import React from 'react';

function LevelCircle({ color }) {
  return (
    <div
      className="level-circle"
      style={{ backgroundColor: color }} // Utilisation de la couleur passée en props
    ></div>
  );
}

export default LevelCircle;
