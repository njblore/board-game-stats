export interface GameScore {
  players: PlayerScore[];
  date: string;
}

export interface PlayerScore {
  name: string;
  scores: CategoryScores[];
}

export interface CategoryScores {
  category: string;
  value: number;
}

export type Corporation =
  | 'Phoblog'
  | 'Saturn Systems'
  | 'Mining Guild'
  | 'Ecoline'
  | 'Credicor'
  | 'Helion'
  | 'Interplanetary Cinematics'
  | 'Inventrix'
  | 'Tharsis Republic'
  | 'Thorgate'
  | 'Teractor'
  | 'Basic'
  | 'UNMI';

export type Expansion = 'Prelude';

export interface AgricolaGameScore extends GameScore {
  location: string;
}

export interface TMGameScore extends GameScore {
  players: TMPlayerScore[];
  expansion?: Expansion;
}

export interface TMPlayerScore extends PlayerScore {
  corporation: Corporation;
}

export interface SinglePlayerScore {
  [player: string]: number;
}

export interface PlayerAllScores {
  [playerName: string]: number[];
}
