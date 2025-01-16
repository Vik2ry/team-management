'use client';
import { useQuery } from "react-query";
import axios from "axios";

const fetchTeam = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const { data } = await axios.get('/api/team', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export default function Dashboard() {
  const { data: team, isLoading, error } = useQuery(['team'], fetchTeam, {
    staleTime: 300000, // Cache data for 5 minutes
    retry: 1, // Retry once in case of failure
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load team.</p>;

  return (
    <div>
      <h1>Your Team</h1>
      <h2>Budget: ${team.budget.toLocaleString()}</h2>
      <ul>
        {team.players.map((player: any) => (
          <li key={player.id}>{player.name} - {player.position} - ${player.price}</li>
        ))}
      </ul>
    </div>
  );
}
