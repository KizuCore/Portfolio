function SoundPlayer({ soundSrc }) {
  const audio = new Audio(soundSrc);

  const playSound = () => {
    audio.play();
  };

  return { playSound };
}

export default SoundPlayer;
