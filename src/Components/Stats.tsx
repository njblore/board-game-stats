import React from "react";
import { totalScore } from "../helpers/scoreCalculations";
const Stats = (props) => {
  let max = { name: "", score: 0 };
  let min = { name: "", score: 100 };
  let overallTotal = 0;
  let scoreCount = 0;
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

    let playerTotal = props.totals[player].reduce((a, v) => (a += v));
    overallTotal += playerTotal;
    scoreCount += props.totals[player].length;
  }
  let averageScore = overallTotal / scoreCount;
  return (
    <div className="stats-container container">
      <header className="header stats-header">
        Some stats from our Agricola Games
      </header>
      <p>
        Total Games Recorded:
        <span className="stat-text"> {props.allGames.length}</span>
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
        <span className="stat-text"> {max.score}</span> scored by the
        indefatigable
        <span className="stat-text"> {max.name}</span>!
      </p>
      <p>
        And the lowest score of all time was
        <span className="stat-text"> {min.score}</span> scored by the
        unstoppable
        <span className="stat-text"> {min.name}</span>!
      </p>
      <p>
        The average score across all games is as respectable
        <span className="stat-text"> {averageScore.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default Stats;
