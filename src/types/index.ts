export type Player = {
    id: string;
    name: string;
    position: string;
    price: number;
    forSale: boolean;
    askingPrice: number;
  };
  
  export type Team = {
    id: string;
    budget: number;
    players: Player[];
  };
  
  export type User = {
    id: string;
    email: string;
    password?: string;
    team: Team;
  };
  