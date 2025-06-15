import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const story_id = searchParams.get('story_id')

  if (!story_id) {
    return NextResponse.json({ error: 'Missing story_id' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://storyai.inferwave.com:29281/shared_story?story_id=${story_id}`)
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch story data' }, { status: 500 })
  }
}
