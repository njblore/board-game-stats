import React, { useState } from 'react';
import './App.css';
import scores from './data/scores.json';
import PieCharts from './Components/PieCharts';
import FinalScoresBar from './Components/FinalScoresBar';
import CategoryAverage from './Components/CategoryAverages';
import Stats from './Components/Stats';

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

  return (
    <div className="App">
      <header className="page-header header">Agricola: The Reckoning</header>
      <Stats
        totals={totals}
        tashVsThom={tashVsThom}
        multiplayer={multiplayer}
      ></Stats>
      <PieCharts tashVsThom={tashVsThom}></PieCharts>
      <FinalScoresBar scores={tashVsThom}></FinalScoresBar>
      <CategoryAverage scores={tashVsThom}></CategoryAverage>
    </div>
  );
};

export default App;
