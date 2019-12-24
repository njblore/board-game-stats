import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
const CategoryAverage = props => {
  const [pool, setPool] = useState(props.scores.games);
  const players = pool.reduce((acc, game) => {
    game.players.forEach(player => {
      !acc.includes(player.name) && acc.push(player.name);
    });
    return acc;
  }, []);
  const blankScores = players.reduce((acc, player) => {
    acc[player] = {
      fields: [],
      pastures: [],
      grain: [],
      vegetables: [],
      sheep: [],
      'wild boar': [],
      cattle: [],
      'unused spaces': [],
      'fenced stables': [],
      'clay rooms': [],
      'stone rooms': [],
      'family members': [],
      'points for cards': [],
      'bonus points': [],
    };
    return acc;
  }, {});
  const categoryScores = pool.reduce((acc, game) => {
    game.players.forEach(player => {
      for (let category in player.scores) {
        acc[player.name][category]
          ? acc[player.name][category].push(player.scores[category])
          : (acc[player.name][category] = [player.scores[category]]);
      }
    });
    return acc;
  }, blankScores);
  let averages = players.reduce((acc, player) => {
    acc[player] = {};
    return acc;
  }, {});
  for (let player in categoryScores) {
    for (let category in categoryScores[player]) {
      let total = categoryScores[player][category].reduce(
        (acc, score) => (acc += score),
      );
      let avg = total / categoryScores[player][category].length;
      averages[player][category] = avg.toFixed(2);
    }
  }
  const categories = Object.keys(averages.Thom);
  const getAverages = name => {
    return Object.values(averages[name]);
  };
  const colours = [
    '#ff57bd',
    'yellow',
    '#14c017',
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
      hoverBackgroundColor: colours[i],
      hoverBorderColor: 'black',
      data: getAverages(player),
    };
  });
  const data = {
    labels: categories,
    datasets: sets,
  };

  return (
    <div className="category-container">
      <header className="header">Category Averages</header>
      <div className="button-container">
        <button onClick={() => setPool(props.twoPlayer)}>Two Player</button>
        <button onClick={() => setPool(props.multiplayer)}>Multiplayer</button>
        <button onClick={() => setPool(props.scores.games)}>All Games</button>
      </div>
      <Bar data={data}></Bar>
    </div>
  );
};

export default CategoryAverage;
