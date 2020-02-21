export const getPlayers = game => {
  return game.reduce((acc, game) => {
    game.players.forEach(player => {
      !acc.includes(player.name) && acc.push(player.name);
    });
    return acc;
  }, []);
};
