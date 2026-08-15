type SoundPlayerProps = {
  soundSrc: string;
};

/* Plays a short audio asset on demand. */
function SoundPlayer({ soundSrc }: SoundPlayerProps) {
  const audio = new Audio(soundSrc);

  const playSound = (): void => {
    audio.play().catch((e) => console.error("Playback failed", e));
  };

  return { playSound };
}

export default SoundPlayer;
