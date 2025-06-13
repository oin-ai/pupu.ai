"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
      </div>
      <button 
        onClick={() => {
          // Try to open the app
          window.location.href = deepLinkUrl;
          
          // If app not installed, redirect based on platform
          setTimeout(() => {
            if (!document.hidden) {
              const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
              const isAndroid = /Android/.test(navigator.userAgent);
              
              if (isIOS) {
                // iOS - redirect to App Store
                window.location.href = 'https://apps.apple.com/cn/app/story-ai/idYOUR_APP_ID';
              } else if (isAndroid) {
                // Android - redirect to official website
                window.location.href = 'https://www.pupupuai.com';
              } else {
                // Other devices - redirect to official website
                window.location.href = 'https://www.pupupuai.com';
              }
            }
          }, 500);
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
