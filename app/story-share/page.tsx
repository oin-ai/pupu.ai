"use client";
import React, { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Load metadata immediately
    audio.load();
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]); // Re-run when src changes

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(duration)) return '0:00';
    const remaining = Math.max(0, duration - time);
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex items-center gap-3 p-1 rounded-lg">
      <button 
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF45A]"
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={currentTime}
        onChange={handleSeek}
        className="flex-1 h-0.5 rounded-full appearance-none cursor-pointer custom-range"
        style={{
          background: `
            linear-gradient(
              to right,
              #000 0%,
              #000 ${(currentTime / (duration || 100)) * 100}%,
              #fff ${(currentTime / (duration || 100)) * 100}%,
              #fff 100%
            )
          `
        }}
      />
      
      <span className="text-xs text-gray-600">
        {formatTime(currentTime)}
      </span>
      
      <audio ref={audioRef} src={src} />
    </div>
  );
};

// Type declaration for iOS standalone mode
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

function PageContent() {
  const searchParams = useSearchParams();
  
  // Extract query parameters from URL
  const username = searchParams.get('username') || '...';
  const avatarUrl = searchParams.get('avatarUrl') || '/avatar.png';
  const title = searchParams.get('title') || '...';
  const content = searchParams.get('content') || '...';
  const pic_link = searchParams.get('pic_link') || '';
  const audio_link = searchParams.get('audio_link') || '';
  const voice_name = searchParams.get('voice_name') || '兜兜';
  const story_id = searchParams.get('story_id') || '12345';

  // Construct the deep link URL
  const deepLinkUrl = `storyai://pages/story/index?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}&pic_link=${encodeURIComponent(pic_link)}&audio_link=${encodeURIComponent(audio_link)}&voice_name=${encodeURIComponent(voice_name)}&story_id=${story_id}`;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-blue-500 rounded-3xl p-6" style={{ backgroundColor: '#D7EF7A', width: '85%', marginTop: '10%' }}>

        <div className="flex items-center mb-4">
          <img src={avatarUrl} alt="" className="w-13 rounded-full" />
          <span className="ml-3 text-xl">{ username }</span>
        </div>

        <div className="rounded-2xl mx-auto mb-6 overflow-hidden relative pb-5" style={{ backgroundColor: '#FFF45A' }}>
          <img src={Array.isArray(pic_link) ? pic_link[0] : pic_link} alt="" className="" />
          <h1 className="px-4 py-2 text-sm font-semibold">{title}</h1>
          <p className="px-4 text-xs multi-line-ellipsis-5 indent-sm">&emsp;&emsp;{content}</p>
          <img src="/share_frame.png" className="absolute inset-0 w-full h-full" />
        </div>

        <div id="player">
          {audio_link && <AudioPlayer src={audio_link} />}
        </div>
      </div>
      <button 
        onClick={() => {
          // Try to open the app
          window.location.href = deepLinkUrl;
          
          // Check if app is installed (iOS PWA)
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
          const isAndroid = /Android/.test(navigator.userAgent);
          
          if (isIOS && window.navigator.standalone) {
            // iOS app is installed (PWA), do nothing
            return;
          }
          
          // For Android and iOS without PWA, check if app opened
          setTimeout(() => {
            if (!document.hidden) {
              if (isIOS) {
                // iOS - redirect to App Store
                window.location.href = 'https://apps.apple.com/cn/app/story-ai/idYOUR_APP_ID';
              } else if (isAndroid) {
                // Android - redirect to official website
                window.location.href = 'https://www.pupupuai.com';
              }
            }
          }, 1000); // Longer timeout for Android
        }}
        className="px-8 py-3 rounded-full mt-10 text-sm font-semibold" 
        style={{ backgroundColor: '#D7EF7A' }}
      >
        Open Story Ai Listening
      </button>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}
