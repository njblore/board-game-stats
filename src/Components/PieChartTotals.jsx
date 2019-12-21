import * as d3 from 'd3';
import React from 'react';

const PieChartTotals = props => {
  const maxes = Object.values(props.scores).reduce((acc, game) => {
    let totals = game.players.map(player => {
      const totalScore = Object.values(player.scores).reduce(
        (sum, score) => (sum += score),
      );
      return { score: totalScore, player: player.name };
    });

    let totalScoreArray = totals.map(player => player.score);
    let highScore = Math.max(...totalScoreArray);

    if (totalScoreArray.every(score => score === totalScoreArray[0])) {
      acc['draw'] ? (acc['draw'] += 1) : (acc['draw'] = 1);
    } else {
      totals.forEach(player => {
        if (player.score === highScore) {
          acc[player.player]
            ? (acc[player.player] += 1)
            : (acc[player.player] = 1);
        }
      });
    }
    return acc;
  }, {});

  return (
    <div>
      <header>PIE CHART</header>
      <p>Thom Wins : {maxes['Thom']}</p>
      <p>Tash Wins : {maxes['Tash']}</p>
      <p>DRAWS : {maxes['draw']}</p>
    </div>
  );
};

export default PieChartTotals;
