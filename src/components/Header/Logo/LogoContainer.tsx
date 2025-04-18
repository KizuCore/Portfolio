import LogoImage from './LogoImage';
import '../../../assets/styles/Header/header.css';

interface LogoContainerProps {
  isAnimating: boolean;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  t: (key: string) => string;
}

function LogoContainer({ isAnimating, handleMouseDown, handleMouseUp, t }: LogoContainerProps) {
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
