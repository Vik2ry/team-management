'use client'
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Player } from '../../types/index'; // Adjust import path accordingly

// Fetch function to use with useQuery
const fetchPlayers = async (): Promise<Player[]> => {
  const { data } = await axios.get<Player[]>('/api/market');
  return data;
};

export default function Market() {
  const [filter, setFilter] = useState<string>('');

  const { data: players, error, isLoading } = useQuery<Player[], Error>('players', fetchPlayers);

  const handleBuy = async (playerId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/market/buy',
        { playerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Player purchased successfully!');
    } catch (err) {
      alert('Failed to purchase player.');
    }
  };

  const filteredPlayers = players?.filter((player) =>
    player.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${(error as Error).message}`}</p>;

  return (
    <div>
      <h1>Transfer Market</h1>
      <input
        type="text"
        placeholder="Search players..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredPlayers?.map((player) => (
          <li key={player.id}>
            {player.name} - {player.position} - ${player.askingPrice.toLocaleString()}
            <button onClick={() => handleBuy(player.id)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
