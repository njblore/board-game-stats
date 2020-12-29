export interface GameScore {
  players: PlayerScore[];
  date: string;
}

export interface PlayerScore {
  name: string;
  scores: CategoryScores[];
}

export type CategoryScores = Record<string, string | number>;

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
  | 'UNMI';

export interface AgricolaGameScore extends GameScore {
  location: string;
}

export interface TMGameScore extends GameScore {
  players: TMPlayerScore[];
  expansion?: string;
}

export interface TMPlayerScore extends PlayerScore {
  corporation: Corporation;
}

// export interface TMCategoryScores {
//   awards: number;
//   milestones: number;
//   cards: number;
//   board: number;
//   'terraform rating': number;
// }

// export interface AgricolaCategoryScore extends CategoryScore {
//   category: string;
//   value: number;
// }

export interface SinglePlayerScore {
  [player: string]: number;
}

export interface PlayerAllScores {
  [playerName: string]: number[];
}
