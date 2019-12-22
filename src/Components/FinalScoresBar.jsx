import React, { useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const FinalScoresBar = props => {
  const [pool, setPool] = useState(props.twoPlayer);
  const players = pool.reduce((acc, game) => {
    game.players.forEach(player => {
      !acc.includes(player.name) && acc.push(player.name);
    });
    return acc;
  }, []);
  const blankScores = players.reduce((acc, player) => {
    acc[player] = [];
    return acc;
  }, {});
  const scores = pool.reduce((acc, game) => {
    let totals = game.players.map(player => {
      const totalScore = Object.values(player.scores).reduce(
        (sum, score) => (sum += score),
      );
      return { [player.name]: totalScore };
    });

    totals.map(game => {
      for (let player in game) {
        acc[player] = [...acc[player], game[player]];
      }
    });

    return acc;
  }, blankScores);
  const colours = ['#8d6fef', '#ff57bd', '#19da1c'];
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
    <div className="bar-container">
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
