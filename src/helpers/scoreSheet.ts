export interface IndividualCategoryScores {
  high: number;
  low: number;
}

export interface AllCategoryScoresForPlayer {
  [player: string]: { [category: string]: [number] };
}

export interface PlayerCategoryScores {
  [player: string]: Record<string, IndividualCategoryScores>;
}
