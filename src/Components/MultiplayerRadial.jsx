import React from 'react';
import { Polar } from 'react-chartjs-2';

const MultiplayerRadial = props => {
  let totals = props.multiplayer.reduce((acc, game) => {
    game.players.forEach(player => {
      const totalScore = Object.values(player.scores).reduce(
        (sum, score) => (sum += score),
      );
      acc[player.name] = acc[player.name]
        ? [...acc[player.name], totalScore]
        : [totalScore];
    });
    return acc;
  }, {});
  let playerAverages = {};

  for (let player in totals) {
    const totalScore = totals[player].reduce((acc, score) => (acc += score));
    const averageScore = totalScore / totals[player].length;
    playerAverages[player] = averageScore.toFixed(2);
  }
  const data = {
    datasets: [
      {
        data: Object.values(playerAverages),
        backgroundColor: [
          'pink',
          'yellow',
          '#14c017',
          'blue',
          'orange',
          'purple',
          'white',
          'red',
        ],
        label: '',
      },
    ],
    labels: Object.keys(playerAverages),
  };
  return (
    <div className="radial-container">
      <header className="header">Average Multiplayer Game Scores</header>
      <Polar data={data}></Polar>
    </div>
  );
};

export default MultiplayerRadial;
