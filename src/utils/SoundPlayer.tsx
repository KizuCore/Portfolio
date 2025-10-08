type SoundPlayerProps = {
  soundSrc: string;
};

/* Composant pour lire un son */
function SoundPlayer({ soundSrc }: SoundPlayerProps) {
  const audio = new Audio(soundSrc);

  const playSound = (): void => {
    audio.play().catch((e) => console.error("Playback failed", e));
  };

  return { playSound };
}

export default SoundPlayer;
