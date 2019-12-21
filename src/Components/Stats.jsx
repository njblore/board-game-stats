import React from 'react';
import scores from '../data/scores.json';
const Stats = props => {
  console.log(props.totals);
  let max = { name: '', score: 0 };
  let min = { name: '', score: 100 };
  for (let player in props.totals) {
    let playerBest = Math.max(...props.totals[player]);
    let playerWorst = Math.min(...props.totals[player]);
    if (playerBest > max.score) {
      max.name = player;
      max.score = playerBest;
    }
    if (playerWorst < min.score) {
      min.name = player;
      min.score = playerWorst;
    }
  }
  return (
    <div className="stats-container">
      <header className="header stats-header">
        Some stats from our Agricola Games
      </header>
      <p>
        Total Games Recorded:
        <span className="stat-text"> {scores.games.length}</span>
      </p>
      <p>
        Of those games,
        <span className="stat-text"> {props.tashVsThom.length}</span> were 2
        player
      </p>
      <p>
        And <span className="stat-text"> {props.multiplayer.length}</span> were
        multiplayer.
      </p>
      <p>
        The Highest score from all games was
        <span className="stat-text"> {max.score}</span> scored by the amazing
        <span className="stat-text"> {max.name}</span>!
      </p>
      <p>
        And the lowest score of all time was
        <span className="stat-text"> {min.score}</span> scored by the
        unstoppable
        <span className="stat-text"> {min.name}</span>!
      </p>
    </div>
  );
};

export default Stats;
