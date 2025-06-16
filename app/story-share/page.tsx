import { Suspense } from "react";
import type { Metadata } from "next";
import ClientPageContent from "./ClientPageContent";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const params = await searchParams;
  const story_id = params.story_id as string || '';
  const storyData = await getStoryData(story_id);

  return {
    title: `故事分享 - ${storyData.title}` || '',
    description: storyData.content || '',
  };
}

async function getStoryData(story_id: string) {
  if (!story_id) return {
    title: '...',
    content: '...',
    pic_link: '',
    audio_link: '',
    voice_name: ''
  };

  try {
    const response = await fetch(`http://localhost:3000/api/proxy?story_id=${story_id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      title: data?.data?.title || 'Story title ...',
      content: data?.data?.content || 'Story content ...',
      pic_link: data?.data?.pic_link || '',
      audio_link: data?.data?.audio_link || '',
      voice_name: data?.data?.voice_name || ''
    };
  } catch (error) {
    console.error('Error fetching story data:', error);
    return {
      title: '...',
      content: '...',
      pic_link: '',
      audio_link: '',
      voice_name: ''
    };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await searchParams;
  const username = params.username as string || '...';
  const avatarUrl = params.avatarUrl as string || '/avatar.png';
  const story_id = params.story_id as string || '';
  const storyData = await getStoryData(story_id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPageContent 
        username={username}
        avatarUrl={avatarUrl}
        story_id={story_id}
        storyData={storyData}
      />
    </Suspense>
  );
}
