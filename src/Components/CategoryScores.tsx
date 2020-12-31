import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { getPlayers } from '../helpers/getPlayers';
import { PlayerCategoryScores } from '../helpers/scoreSheet';
import {
  categoryScoresForEachPlayer,
  getGameCategories,
} from '../helpers/scoreCalculations';
import { GameScore } from '../models/game';

const CategoryAverage = (props) => {
  const [pool] = useState<GameScore[]>(props.games);
  const [player, setPlayer] = useState<string>('Tash');

  const players = getPlayers(pool).sort();

  const categoryScores = categoryScoresForEachPlayer(pool);

  let playerScores: PlayerCategoryScores = players.reduce((acc, player) => {
    acc[player] = {};
    return acc;
  }, {});

  for (let player in categoryScores) {
    for (let category in categoryScores[player]) {
      if (category !== 'total') {
        let high = Math.max(...categoryScores[player][category]);
        let low = Math.min(...categoryScores[player][category]);
        playerScores[player][category] = { high, low };
      }
    }
  }

  const categories = getGameCategories(pool[0]);

  const highSet = {
    label: 'High',
    backgroundColor: 'rgb(65,177,249)',
    borderColor: 'black',
    borderWidth: 0.5,
    hoverBorderColor: 'black',
    data: Object.values(playerScores[player]).map((scores) => scores.high),
  };

  const lowSet = {
    label: 'Low',
    backgroundColor: 'rgb( 255, 144, 67 )',
    borderColor: 'black',
    borderWidth: 0.5,
    hoverBorderColor: 'black',
    data: Object.values(playerScores[player]).map((scores) => scores.low),
  };

  const data = {
    labels: categories,
    datasets: [lowSet, highSet],
  };

  const legendOpts = {
    display: true,
    position: 'top',
    fullWidth: false,
    reverse: false,
    labels: {
      fontColor: 'greysmoke',
    },
  };

  return (
    <div className="category-container container">
      <header className="header">Category Averages</header>
      <div className="button-container">
        {players.map((p) => (
          <button
            className={`agricola-button ${p === player ? 'highlighted' : ''}`}
            onClick={() => setPlayer(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <Radar data={data} legend={legendOpts}></Radar>
    </div>
  );
};

export default CategoryAverage;
