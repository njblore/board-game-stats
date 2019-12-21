import React from 'react';
import { RadialChart } from 'react-vis';
import { Doughnut } from 'react-chartjs-2';

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

  const data = {
    labels: [
      `Thom Wins: ${maxes['Thom']}`,
      `Tash Wins: ${maxes['Tash']}`,
      `Draw: ${maxes['draw']}`,
    ],
    datasets: [
      {
        data: [maxes['Thom'], maxes['Tash'], maxes['draw']],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <header>{props.title}</header>
      <Doughnut data={data}></Doughnut>
    </div>
  );
};

export default TwoPlayerPie;
