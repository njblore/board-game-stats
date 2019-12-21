import React from 'react';
import { Bar, Polar } from 'react-chartjs-2';
const CategoryAverage = props => {
  const categoryScores = props.scores.reduce(
    (acc, game) => {
      game.players.forEach(player => {
        for (let category in player.scores) {
          acc[player.name][category].push(player.scores[category]);
        }
      });
      return acc;
    },
    {
      Thom: {
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
      },
      Tash: {
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
      },
    },
  );

  let averages = { Thom: {}, Tash: {} };
  for (let player in categoryScores) {
    for (let category in categoryScores[player]) {
      console.log(category, player);
      let total = categoryScores[player][category].reduce(
        (acc, score) => (acc += score),
      );
      let avg = total / categoryScores[player][category].length;
      averages[player][category] = avg.toFixed(2);
    }
  }

  const categories = Object.keys(averages.Thom);
  const tashScores = Object.values(averages.Tash);
  const thomScores = Object.values(averages.Thom);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Thom',
        backgroundColor: '#f81e8a',
        borderColor: 'black',
        borderWidth: 0.5,
        hoverBackgroundColor: '#f81e8a',
        hoverBorderColor: 'black',
        data: thomScores,
      },
      {
        label: 'Tash',
        backgroundColor: '#e6e31b',
        borderColor: 'black',
        borderWidth: 0.5,
        hoverBackgroundColor: '#e6e31b',
        hoverBorderColor: 'black',
        data: tashScores,
      },
    ],
  };

  return (
    <div className="category-container">
      <header className="header">Category Averages</header>
      <Bar data={data}></Bar>
    </div>
  );
};

export default CategoryAverage;
