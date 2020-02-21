import { totalScore } from './scoreCalculations';

export const dataPointForTopic = (topic, games) => {
  return games.reduce((acc, game) => {
    game.players.forEach(player => {
      acc.push({
        y: player.scores[topic].toFixed(0),
        x: totalScore(Object.values(player.scores)),
      });
    });
    return acc;
  }, []);
};
