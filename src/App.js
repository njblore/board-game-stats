import React, { useState } from 'react';
import './App.css';
import BarChartAverage from './Components/BarChartAverages';
import PieChartTotals from './Components/PieChartTotals';
import scores from './data/scores.json';

const App = () => {
  const overallTotals = scores.games.reduce((acc, game) => {
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

  const [totals, setTotals] = useState(overallTotals);
  const [tashVsThom, setTashVsThom] = useState(
    scores.games.filter(game => game.players.length === 2),
  );
  const [multiplayer, setMultiplayer] = useState(
    scores.games.filter(game => game.players.length > 2),
  );

  const maxes = Object.values(tashVsThom).reduce((acc, game) => {
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

  const [tashThomWins, setTashThomWins] = useState(maxes);

  return (
    <div className="App">
      <BarChartAverage></BarChartAverage>
      <PieChartTotals maxes={tashThomWins}></PieChartTotals>
    </div>
  );
};

export default App;
