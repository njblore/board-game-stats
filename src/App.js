import React, { useState } from 'react';
import './App.css';
import scores from './data/scores.json';
import PieCharts from './Components/PieCharts';
import FinalScoresBar from './Components/FinalScoresBar';
import CategoryAverage from './Components/CategoryAverages';
import Stats from './Components/Stats';
import MultiplayerRadial from './Components/MultiplayerRadial';
import ScatterRelationships from './Components/ScatterRelationships';

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
      <FinalScoresBar
        scores={scores}
        twoPlayer={tashVsThom}
        multiplayer={multiplayer}
      ></FinalScoresBar>
      <CategoryAverage
        scores={scores}
        twoPlayer={tashVsThom}
        multiplayer={multiplayer}
      ></CategoryAverage>
      <MultiplayerRadial multiplayer={multiplayer}></MultiplayerRadial>
      <ScatterRelationships></ScatterRelationships>
    </div>
  );
};

export default App;
