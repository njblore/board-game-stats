import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const FinalScoresBar = props => {
  const scores = props.scores.reduce(
    (acc, game) => {
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
    },
    { Tash: [], Thom: [] },
  );
  const data = {
    labels: props.scores.map(game => game.date.split('/')),
    datasets: [
      {
        label: 'Thom',
        backgroundColor: '#f4bc77',
        borderColor: 'black',
        borderWidth: 0.5,
        hoverBackgroundColor: '#f4bc77',
        hoverBorderColor: 'black',
        data: scores['Thom'],
      },
      {
        label: 'Tash',
        backgroundColor: '#71c572',
        borderColor: 'black',
        borderWidth: 0.5,
        hoverBackgroundColor: '#71c572',
        hoverBorderColor: 'black',
        data: scores['Tash'],
      },
    ],
  };

  return (
    <div className="bar-container">
      <header className="header">Final Scores</header>
      <HorizontalBar data={data} height={1000} />
    </div>
  );
};

export default FinalScoresBar;
