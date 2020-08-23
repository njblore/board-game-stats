import { PlayerScore } from "./playerScore";

export interface GameScore {
  players: PlayerScore[];
  date: string;
  location: string;
}
