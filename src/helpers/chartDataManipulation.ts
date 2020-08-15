import { GameScore } from "../models/game";
import { totalScore } from "./scoreCalculations";

export const dataPointForTopic = (topic: string, games: GameScore[]) => {
  return games.reduce((acc, game) => {
    game.players.forEach((player) => {
      acc.push({
        y: player.scores.find(
          (score) => score.category === topic && score.value.toFixed
        ).value,
        x: totalScore(player),
      });
    });
    return acc;
  }, []);
};
