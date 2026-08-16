import LogoImage from './LogoImage';
import '../../../assets/styles/Header/Navigation.css';

interface LogoContainerProps {
  isAnimating: boolean;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  t: (key: string) => string;
}

function LogoContainer({ isAnimating, handleMouseDown, handleMouseUp, handleMouseLeave, t }: LogoContainerProps) {
  return (
    <div
      className={`d-flex logo-container ${isAnimating ? 'start-border-animation' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <LogoImage isAnimating={isAnimating} t={t} />
    </div>
  );
}

export default LogoContainer;
