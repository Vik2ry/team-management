const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY

export async function getRandomFootballGif(): Promise<string> {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=football+player&rating=g`
    )
    const data = await response.json()
    return data.data.images.original.url
  } catch (error) {
    console.error('Error fetching Giphy:', error)
    return '/placeholder.svg'
  }
}

