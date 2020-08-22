export interface ScoreSheet {
  fields: number[];
  pastures: number[];
  grain: number[];
  vegetables: number[];
  sheep: number[];
  "wild boar": number[];
  cattle: number[];
  "unused spaces": number[];
  "fenced stables": number[];
  "clay rooms": number[];
  "stone rooms": number[];
  "family members": number[];
  "points for cards": number[];
  "bonus points": number[];
  total: number[];
  horses?: number[];
}

export interface PlayerCategoryScores {
  [player: string]: ScoreSheet;
}

export const blankScoreSheet = (players: string[]): PlayerCategoryScores => {
  return players.reduce((acc, player) => {
    acc[player] = {
      fields: [],
      pastures: [],
      grain: [],
      vegetables: [],
      sheep: [],
      "wild boar": [],
      cattle: [],
      "unused spaces": [],
      "fenced stables": [],
      "clay rooms": [],
      "stone rooms": [],
      "family members": [],
      "points for cards": [],
      "bonus points": [],
      horses: [],
    };
    return acc;
  }, {});
};
