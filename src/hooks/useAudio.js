import { useState, useEffect } from "react";

const useAudio = (audioSrc) => {
  const audioSource = useState(new Audio(audioSrc));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setTimeout(() => {
      isPlaying ? audioSource["0"].play() : audioSource["0"].pause();
    }, 2000);
    return () => {};
  }, [isPlaying]);

  useEffect(() => {
    audioSource["0"].addEventListener("ended", setIsPlaying(false));
    return () => {
      audioSource["0"].removeEventListener("ended", setIsPlaying(false));
      clearTimeout(setTimeout(() => {}, 2000));
    };
  }, [audioSource["0"]]);

  return [audioSource, togglePlayAudio];
};

export default useAudio;
