"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function PrivacyPage() {
  const searchParams = useSearchParams();
  
  // Extract query parameters from URL
  const username = searchParams.get('username') || '--';
  const avatarUrl = searchParams.get('avatarUrl') || '/avatar.png';
  const title = searchParams.get('title') || '小蝌蚪找妈妈';
  const content = searchParams.get('content') || '在一条清澈的小河里，住着一群可爱的小蝌蚪。它们是青蛙妈妈的孩子，刚从卵里孵化出来，黑黑的身子，细细的尾巴，在水里快活地游来游去，在一条清澈的小河里，住着一群可爱的小蝌蚪。它们是青蛙妈妈的孩子，刚从卵里孵化出来，黑黑的身子，细细的尾巴，在水里快活地游来游去，在一条清澈的小河里，住着一群可爱的小蝌蚪。它们是青蛙妈妈的孩子，刚从卵里孵化出来，黑黑的身子，细细的尾巴，在水里快活地游来游去';
  const pic_link = searchParams.get('pic_link') || 'https://storyai.inferwave.com:29281/image/hot/b6dbdb426812ba2e7c9e3827abdeaaa6.jpg';
  const audio_link = searchParams.get('audio_link') || 'https://storyai.inferwave.com:29281/audio/hot/b5049a2c8e68f427dc0fbfd5dae4d589.mp3';
  const voice_name = searchParams.get('voice_name') || '兜兜';
  const story_id = searchParams.get('story_id') || 'b5049a2c8e68f427dc0fbfd5dae4d589';

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
          
          // If app not installed, redirect to App Store after timeout
          setTimeout(() => {
            if (!document.hidden) {
              // Replace with your actual App Store URL
              window.location.href = 'https://apps.apple.com/cn/app/story-ai/idYOUR_APP_ID';
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
