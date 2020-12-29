import {
  AgricolaGameScore,
  PlayerAllScores,
  PlayerScore,
  SinglePlayerScore,
} from '../models/game';
import { PlayerCategoryScores, ScoreSheet } from './scoreSheet';

export const totalScoresForGame = (playersArray: PlayerScore[]) => {
  return playersArray.map((player) => {
    return {
      score: player.scores.find((score) => score.category === 'total').value,
      player: player.name,
    };
  });
};

export const scoresForEachPlayer = (
  games: AgricolaGameScore[],
): PlayerAllScores => {
  return games.reduce((acc, game) => {
    game.players.forEach((player) => {
      const total = player.scores.find((score) => score.category === 'total')
        .value;
      acc[player.name] = acc[player.name]
        ? [...acc[player.name], total]
        : [total];
    });
    return acc;
  }, {});
};

export const categoryScoresForEachPlayer = (
  games: AgricolaGameScore[],
  blankScores: PlayerCategoryScores,
): PlayerCategoryScores => {
  return games.reduce((acc, game) => {
    game.players.forEach((player) => {
      for (let category of player.scores) {
        acc[player.name][category.category]
          ? acc[player.name][category.category].push(category.value)
          : (acc[player.name][category.category] = [category.value]);
      }
    });
    return acc;
  }, blankScores);
};

export const averageScoresFromObject = (
  allScores: PlayerAllScores,
): SinglePlayerScore => {
  return Object.keys(allScores).reduce((acc, player) => {
    acc[player] = averageScoreFromArray(allScores[player]);
    return acc;
  }, {});
};

export const totalScore = (playerScore: PlayerScore): number => {
  return Number(
    playerScore.scores.find((score) => score.category === 'total').value,
  );
};

export const averageScoreFromArray = (scoreArray: number[]): number => {
  const average = scoreArray.reduce((a, v) => (a += v)) / scoreArray.length;
  return Number(average.toFixed(2));
};

export const winCounts = (games: AgricolaGameScore[]) =>
  games.reduce((acc, game): SinglePlayerScore => {
    let totalsForGame = totalScoresForGame(game.players);

    let totalScoreArray = totalsForGame.map((player) => player.score);
    let highScore = Math.max(...totalScoreArray.map(Number));

    if (totalScoreArray.every((score) => score === totalScoreArray[0])) {
      acc['draw'] ? (acc['draw'] += 1) : (acc['draw'] = 1);
    } else {
      totalsForGame.forEach((player) => {
        if (player.score === highScore) {
          acc[player.player]
            ? (acc[player.player] += 1)
            : (acc[player.player] = 1);
        }
      });
    }
    return acc;
  }, {});
