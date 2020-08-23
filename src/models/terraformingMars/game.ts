export interface GameScore {
  date: string;
  players: PlayerScore[];
}

export type Corporation =
  | "Phoblog"
  | "Saturn Systems"
  | "Mining Guild"
  | "Ecoline"
  | "Credicor"
  | "Helion"
  | "Interplanetary Cinematics"
  | "Inventrix"
  | "Tharsis Republic"
  | "Thorgate"
  | "Teractor"
  | "UNMI";

export interface PlayerScore {
  name: string;
  corporation: Corporation;
  scores: CategoryScores[];
}

export interface CategoryScores {
  awards: number;
  milestones: number;
  cards: number;
  board: number;
  "terraform rating": number;
}
