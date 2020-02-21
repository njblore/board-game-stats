import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { totalScoresForGame } from '../helpers/scoreCalculations';

const TwoPlayerPie = props => {
  const maxes = props.tashVsThom.reduce((acc, game) => {
    let totals = totalScoresForGame(game.players);

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

  const data = {
    labels: [`Thom Wins`, `Tash Wins`, `Draw`],
    datasets: [
      {
        data: [maxes['Thom'], maxes['Tash'], maxes['draw']],
        backgroundColor: props.backgroundColor,
        hoverBackgroundColor: props.backgroundColor,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <header className="header chart-header">{props.title}</header>
      <Doughnut data={data}></Doughnut>
    </div>
  );
};

export default TwoPlayerPie;
