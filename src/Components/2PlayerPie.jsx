import React from 'react';
import { RadialChart } from 'react-vis';

const TwoPlayerPie = props => {
  const maxes = props.tashVsThom.reduce((acc, game) => {
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
  const data = [
    { angle: maxes['Thom'], label: 'Thom Wins' },
    { angle: maxes['Tash'], label: 'Tash Wins' },
    { angle: maxes['draw'], label: 'Draw!' },
  ];
  return (
    <div>
      <header>{props.title}</header>
      <RadialChart data={data} width={300} height={300} showLabels={true} />
    </div>
  );
};

export default TwoPlayerPie;
