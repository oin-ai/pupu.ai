"use client";
import React, { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

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
        className="w-7 h-7 flex items-center justify-center rounded-full"
      >
        <img src={ isPlaying ? '/pause.png' : '/play.png' } alt="" className="w-full" />
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
              #ffffffa1 ${(currentTime / (duration || 100)) * 100}%,
              #ffffffa1 100%
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
  
  // Extract only required parameters from URL
  const username = searchParams.get('username') || '...';
  const avatarUrl = searchParams.get('avatarUrl') || '/avatar.png';
  const story_id = searchParams.get('story_id') || '';

  // State for API data
  const [storyData, setStoryData] = useState({
    title: '...',
    content: '...',
    pic_link: '',
    audio_link: '',
    voice_name: ''
  });

  // Fetch story data when story_id changes
  useEffect(() => {
    if (story_id) {
      fetch(`/api/proxy?story_id=${story_id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setStoryData({
            title: data?.data?.title || '测试故事',
            content: data?.data?.content || '测试故事测试故事测试故事测试故事，测试故事测试故事测试故事，测试故事，测试故事测试故事测试故事测试故事，测试故事测试故事测试故事，测试故事，测试故事测试故事测试故事测试故事，测试故事测试故事测试故事，测试故事，测试故事测试故事测试故事测试故事，测试故事测试故事测试故事，测试故事',
            pic_link: data?.data?.pic_link || 'https://storyai.inferwave.com:29281/image/storylogo/c1294640c75a4d3ed65d1bba9ee5284a.jpg',
            audio_link: data?.data?.audio_link || 'https://zk.work/download/test-audio.mp3',
            voice_name: data?.data?.voice_name || '45454545'
          });
        })
        .catch(error => {
          console.error('Error fetching story data:', error);
        });
    }
  }, [story_id]);

  // Construct the deep link URL using API data
  const deepLinkUrl = `storyai://pages/story/index?story_id=${story_id}`;

  return (
    <>
      <Head>
        <title>{storyData.title}</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
      <div className="bg-blue-500 rounded-3xl p-6 w-5/6 md:w-90" style={{ backgroundColor: '#D7EF7A', marginTop: '10%' }}>

        <div className="flex items-center mb-4">
          <img src={avatarUrl} alt="" className="w-13 rounded-full" />
          <span className="ml-3 text-xl">{ username }</span>
        </div>

        <div className="rounded-2xl mx-auto mb-6 overflow-hidden relative pb-5" style={{ backgroundColor: '#FFF45A' }}>
          <div style={{aspectRatio: '1.7777', background: '#0000000a'}}>
            {storyData.pic_link && (
              <img 
                src={Array.isArray(storyData.pic_link) ? storyData.pic_link[0] : storyData.pic_link} 
                alt="" 
                className="rounded-t-3xl" 
              />
            )}
          </div>
          <h1 className="px-4 py-2 text-sm font-semibold">{storyData.title}</h1>
          <p className="px-4 text-xs multi-line-ellipsis indent-sm">&emsp;&emsp;{storyData.content}</p>
          <img src="/share_frame.png" className="absolute inset-0 w-full h-full" />
        </div>

        <div id="player">
          {storyData.audio_link && <AudioPlayer src={storyData.audio_link} />}
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
    </>
  )
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}
