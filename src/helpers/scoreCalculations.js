export const totalScoresForGame = playersArray => {
  return playersArray.map(player => {
    return {
      score: totalScore(Object.values(player.scores)),
      player: player.name,
    };
  });
};

export const scoresForEachPlayer = games => {
  return games.reduce((acc, game) => {
    game.players.forEach(player => {
      const total = totalScore(Object.values(player.scores));
      acc[player.name] = acc[player.name]
        ? [...acc[player.name], total]
        : [total];
    });
    return acc;
  }, {});
};

export const categoryScoresForEachPlayer = (games, blankScores) => {
  return games.reduce((acc, game) => {
    game.players.forEach(player => {
      for (let category in player.scores) {
        acc[player.name][category]
          ? acc[player.name][category].push(player.scores[category])
          : (acc[player.name][category] = [player.scores[category]]);
      }
    });
    return acc;
  }, blankScores);
};

export const averageScoresFromObject = allScores => {
  return Object.keys(allScores).reduce((acc, player) => {
    acc[player] = averageScoreFromArray(allScores[player]);
    return acc;
  }, {});
};

export const totalScore = scoresArray => {
  return scoresArray.reduce((acc, score) => (acc += score));
};

export const averageScoreFromArray = scoreArray => {
  const average = totalScore(scoreArray) / scoreArray.length;
  return average.toFixed(2);
};
