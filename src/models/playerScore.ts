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

export const blankPlayerScoreSheet: PlayerScore = {
  name: "",
  scores: [
    {
      category: "fields",
      value: 0,
    },
    {
      category: "pastures",
      value: 0,
    },
    {
      category: "grain",
      value: 0,
    },
    {
      category: "vegetables",
      value: 0,
    },
    {
      category: "sheep",
      value: 0,
    },
    {
      category: "wild boar",
      value: 0,
    },
    {
      category: "cattle",
      value: 0,
    },
    {
      category: "unused spaces",
      value: 0,
    },
    {
      category: "fenced stables",
      value: 0,
    },
    {
      category: "clay rooms",
      value: 0,
    },
    {
      category: "stone rooms",
      value: 0,
    },
    {
      category: "family members",
      value: 0,
    },
    {
      category: "bonus points",
      value: 0,
    },
    {
      category: "points for cards",
      value: 0,
    },
    {
      category: "horses",
      value: 0,
    },
  ],
};
