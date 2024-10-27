import React from 'react';
import LogoImage from './LogoImage';
import '../../../Assets/style/Header/header.css';

function LogoContainer({ isAnimating, handleMouseDown, handleMouseUp, t }) {
  return (
    <div
      className={`d-flex logo-container ${isAnimating ? 'start-border-animation' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <LogoImage isAnimating={isAnimating} t={t} />
    </div>
  );
}

export default LogoContainer;
