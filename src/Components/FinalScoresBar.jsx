import React, { useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { getPlayers } from '../helpers/getPlayers';
import { scoresForEachPlayer } from '../helpers/scoreCalculations';

const FinalScoresBar = props => {
  const [pool, setPool] = useState(props.twoPlayer);
  const players = getPlayers(pool);
  const scores = scoresForEachPlayer(pool);

  const colours = [
    '#8d6fef',
    '#ff57bd',
    '#19da1c',
    '#2b74fe',
    'orange',
    '#9814c0',
    'white',
    'red',
  ];
  const sets = players.map((player, i) => {
    return {
      label: player,
      backgroundColor: colours[i],
      borderColor: 'black',
      borderWidth: 0.5,
      hoverBackgroundColor: '#8d6fef',
      hoverBorderColor: 'black',
      data: scores[player],
    };
  });
  const data = {
    labels: pool.map(game => game.date.split('/')),
    datasets: sets,
  };

  return (
    <div className="bar-container container">
      <header className="header">Final Scores</header>
      <div className="button-container">
        <button onClick={() => setPool(props.twoPlayer)}>Two Player</button>
        <button onClick={() => setPool(props.multiplayer)}>Multiplayer</button>
        <button onClick={() => setPool(props.scores.games)}>All Games</button>
      </div>
      <HorizontalBar data={data} height={1000} />
    </div>
  );
};

export default FinalScoresBar;
