import { AgricolaGameScore } from '../models/game';

export const getPlayers = (games: AgricolaGameScore[]): string[] => {
  return games.reduce((acc, game) => {
    game.players.forEach((player) => {
      !acc.includes(player.name) && acc.push(player.name);
    });
    return acc;
  }, []);
};
