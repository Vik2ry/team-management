import { useQuery } from "react-query";
import axios from "axios";

const fetchTeam = async () => {
  const { data } = await axios.get("/api/team", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
};

export default function Dashboard() {
  const { data: team, isLoading, error } = useQuery("team", fetchTeam);

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
