const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY

interface FootballPlayer {
  name: string
  image: string
}

const FOOTBALL_PLAYERS: FootballPlayer[] = [
    { name: "Lionel Messi", image: "https://media.api-sports.io/football/players/154.png" },
    { name: "Cristiano Ronaldo", image: "https://media.api-sports.io/football/players/874.png" },
    { name: "Erling Haaland", image: "https://media.api-sports.io/football/players/1100.png" },
    { name: "Kylian Mbappe", image: "https://media.api-sports.io/football/players/973.png" },
    { name: "Kevin De Bruyne", image: "https://media.api-sports.io/football/players/210.png" },
    { name: "Robert Lewandowski", image: "https://media.api-sports.io/football/players/129.png" },
    { name: "Karim Benzema", image: "https://media.api-sports.io/football/players/162.png" },
    { name: "Mohamed Salah", image: "https://media.api-sports.io/football/players/317.png" },
    { name: "Virgil van Dijk", image: "https://media.api-sports.io/football/players/186.png" },
    { name: "Luka Modric", image: "https://media.api-sports.io/football/players/121.png" },
    { name: "Neymar Jr.", image: "https://media.api-sports.io/football/players/114.png" },
    { name: "Harry Kane", image: "https://media.api-sports.io/football/players/278.png" },
    { name: "Sadio Mane", image: "https://media.api-sports.io/football/players/225.png" },
    { name: "Joshua Kimmich", image: "https://media.api-sports.io/football/players/292.png" },
    { name: "Vinicius Jr.", image: "https://media.api-sports.io/football/players/1865.png" },
    { name: "Thibaut Courtois", image: "https://media.api-sports.io/football/players/303.png" },
    { name: "Casemiro", image: "https://media.api-sports.io/football/players/289.png" },
    { name: "Jude Bellingham", image: "https://media.api-sports.io/football/players/1120.png" },
    { name: "Phil Foden", image: "https://media.api-sports.io/football/players/1121.png" },
    { name: "Son Heung-min", image: "https://media.api-sports.io/football/players/194.png" },
    // Add additional players here
  ];  

export function getRandomPlayerImage(): FootballPlayer {
  const randomIndex = Math.floor(Math.random() * FOOTBALL_PLAYERS.length)
  return FOOTBALL_PLAYERS[randomIndex]
}

export async function getFootballGif(): Promise<string> {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=football+goal+celebration&rating=g`
    )
    const data = await response.json()
    return data.data.images.original.url
  } catch (error) {
    console.error('Error fetching Giphy:', error)
    return '/placeholder.svg'
  }
}

