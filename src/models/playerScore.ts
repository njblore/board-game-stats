import { CategoryScore } from "./categoryScore";

export interface PlayerScore {
  name: string;
  scores: CategoryScore[];
}

export interface SinglePlayerScore {
  [player: string]: number;
}

export interface PlayerAllScores {
  [playerName: string]: number[];
}
