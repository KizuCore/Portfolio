type SoundPlayerProps = {
  soundSrc: string;
};

function SoundPlayer({ soundSrc }: SoundPlayerProps) {
  const audio = new Audio(soundSrc);

  const playSound = (): void => {
    audio.play().catch((e) => console.error("Playback failed", e));
  };

  return { playSound };
}

export default SoundPlayer;
