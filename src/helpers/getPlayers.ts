import { GameScore } from "../models/agricola/game";

export const getPlayers = (games: GameScore[]): string[] => {
  return games.reduce((acc, game) => {
    game.players.forEach((player) => {
      !acc.includes(player.name) && acc.push(player.name);
    });
    return acc;
  }, []);
};
