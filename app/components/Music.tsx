"use client";

import { useRef, useState } from "react";

type MusicProps = {
  music: {
    enabled: boolean;
    title: string;
    audio: string;
  };
};

export default function Music({ music }: MusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!music.enabled || !music.audio) {
    return null;
  }

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={music.audio}
        loop
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        title={music.title}
        className={`
          fixed bottom-5 right-5 z-50
          flex h-12 w-12
          items-center justify-center
          rounded-full
          border border-[#F7F4EE]/50
          text-[#F7F4EE]
          shadow-[0_6px_20px_rgba(74,74,66,0.20)]
          backdrop-blur-sm
          transition-all duration-300
          hover:scale-105
          active:scale-95
          ${
            isPlaying
              ? "bg-[#7F8974]"
              : "bg-[#A8B09A]"
          }
        `}
      >
        <span
          className={`
            leading-none
            transition-transform duration-300
            ${isPlaying ? "text-base" : "text-lg"}
          `}
        >
          {isPlaying ? "❚❚" : "♫"}
        </span>
      </button>
    </>
  );
}