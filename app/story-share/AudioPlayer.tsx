"use client";
import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    // 立即检查
    if (audio.readyState > 0) {
      handleLoadedMetadata();
    }

    // 微信浏览器备用方案
    const checkDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      } else {
        setTimeout(checkDuration, 100);
      }
    };

    // 启动检查
    setTimeout(checkDuration, 100);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audioRef.current.currentTime = pos * audioRef.current.duration;
    setProgress(pos * 100);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const displayTime = isPlaying 
    ? (audioRef.current?.duration || duration) - (audioRef.current?.currentTime || 0)
    : duration;

  return (
    <div className="flex items-center justify-between p-1 rounded-full">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div 
        className="flex-1 ml-1 h-[2px] bg-[#00000018] rounded-full overflow-hidden cursor-pointer rounded-full"
        onClick={!isDragging ? handleSeek : undefined}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="h-full bg-black" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 w-12 text-center">
        {formatTime(displayTime)}
      </div>
      <button onClick={togglePlay} className="flex items-center justify-center">
        {isPlaying ? (
          <img src="/pause.png" alt="Pause" className="w-6.5 h-6.5" />
        ) : (
          <img src="/play.png" alt="Play" className="w-6.5 h-6.5" />
        )}
      </button>
    </div>
  );
}
