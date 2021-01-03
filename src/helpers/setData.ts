import { GameScore } from '../models/game';

export const divideGamesByPlayerCount = (
  games: GameScore[],
): [GameScore[], GameScore[]] => {
  let twoPlayer = [];
  let multiplayer = [];
  games.forEach((game) => {
    if (game.players.length > 2) {
      multiplayer.push(game);
    } else {
      twoPlayer.push(game);
    }
  });
  return [twoPlayer, multiplayer];
};
