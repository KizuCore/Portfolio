import LogoImage from './LogoImage';
import '../Navigation.css';

interface LogoContainerProps {
  isAnimating: boolean;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  handleActivate: () => void;
  t: (key: string) => string;
}

function LogoContainer({ isAnimating, handleMouseDown, handleMouseUp, handleMouseLeave, handleActivate, t }: LogoContainerProps) {
  return (
    <button
      type="button"
      aria-label={t('home_aria')}
      className={`flex logo-container site-nav-logo-button ${isAnimating ? 'start-border-animation' : ''}`}
      onMouseDown={(event) => { if (event.button === 0) handleMouseDown(); }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        if (!event.repeat) handleMouseDown();
      }}
      onKeyUp={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        handleMouseUp();
      }}
      onClick={(event) => { if (event.detail === 0) handleActivate(); }}
    >
      <LogoImage isAnimating={isAnimating} t={t} />
    </button>
  );
}

export default LogoContainer;
