"use client";
import React from "react";
import Head from "next/head";
import AudioPlayer from "./AudioPlayer";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export default function ClientPageContent({
  username,
  avatarUrl,
  story_id,
  storyData
}: {
  username: string;
  avatarUrl: string;
  story_id: string;
  storyData: {
    title: string;
    content: string;
    pic_link: string;
    audio_link: string;
    voice_name: string;
  };
}) {
  const deepLinkUrl = `storyai://pages/story/index?story_id=${story_id}`;

  return (
    <>
      <Head>
        <title>{storyData.title}</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-blue-500 rounded-3xl p-6 w-5/6 md:w-90" style={{ backgroundColor: '#D7EF7A', marginTop: '10%' }}>
          <div className="flex items-center mb-4">
            <img src={avatarUrl} alt="" className="w-13 h-13 rounded-full object-cover" />
            <span className="ml-3 text-xl flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{ 'asndfoandfo asdfoasodfasdfasdfasdfasdfasjdfads' }</span>
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
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            // First try to open the app directly
            window.location.href = deepLinkUrl;
            
            // Set longer timeout for iOS (needs more time to check)
            const timeout = isIOS ? 3000 : 2000;
            
            // Track if app was opened successfully
            let appOpened = false;
            
            const handleVisibilityChange = () => {
              if (document.hidden) {
                appOpened = true;
              }
            };
            
            // Listen for visibility changes
            document.addEventListener('visibilitychange', handleVisibilityChange);
            
            setTimeout(() => {
              // Clean up listener
              document.removeEventListener('visibilitychange', handleVisibilityChange);
              
              // If app wasn't opened (page still visible)
              if (!appOpened) {
                if (isIOS) {
                  // Redirect to App Store if iOS
                  window.location.href = 'https://apps.apple.com/cn/app/story-ai/idYOUR_APP_ID';
                } else if (isAndroid) {
                  // Redirect to website if Android
                  window.location.href = 'https://www.pupupuai.com';
                }
              }
            }, timeout);
          }}
          className="px-8 py-3 rounded-full mt-10 text-sm font-semibold" 
          style={{ backgroundColor: '#D7EF7A' }}
        >
          Open Story Ai To Listen
        </button>
      </div>
    </>
  );
}
