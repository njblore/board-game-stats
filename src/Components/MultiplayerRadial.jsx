import React, { useState } from 'react';
import { Polar } from 'react-chartjs-2';

const MultiplayerRadial = props => {
  const [set, setSet] = useState(props.multiplayer);
  console.log(props.allGames);
  let totals = set.reduce((acc, game) => {
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
          '#ff57bd',
          'yellow',
          '#14c017',
          '#2b74fe',
          'orange',
          '#9814c0',
          'white',
          'red',
        ],
        label: '',
      },
    ],
    labels: Object.keys(playerAverages),
  };
  return (
    <div className="radial-container container">
      <header className="header">Average Game Scores</header>
      <Polar data={data}></Polar>
      <div className="button-container">
        <button onClick={() => setSet(props.twoPlayer)}>Two Player</button>
        <button onClick={() => setSet(props.multiplayer)}>Mutliplayer</button>
        <button onClick={() => setSet(props.allGames)}>All Games</button>
      </div>
    </div>
  );
};

export default MultiplayerRadial;
