import React from 'react';
import { GameScore, PlayerAllScores } from '../../models/game';
import './stats.css';

interface Props {
  totals: PlayerAllScores;
  tashVsThom: GameScore[];
  gameName: string;
  stylePrefix: string;
  multiplayer?: GameScore[];
  allGames?: GameScore[];
}

const Stats = (props: Props) => {
  let max = { name: '', score: 0 };
  let min = { name: '', score: 100 };
  let overallTotal: number = 0;
  let scoreCount: number = 0;
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
    <div className={`${props.stylePrefix}-stats stats-container grid-one`}>
      <header className={`${props.stylePrefix}-header header stats-header`}>
        Some stats from our {props.gameName} Games
      </header>
      <p>
        Total Games Recorded:
        <span className={`${props.stylePrefix}-stat-text`}>
          {' '}
          {props.allGames.length}
        </span>
      </p>
      <p>
        Of those games,
        <span className={`${props.stylePrefix}-stat-text`}>
          {' '}
          {props.tashVsThom.length}
        </span>{' '}
        were 2 player
      </p>

      {props.multiplayer !== undefined && (
        <p>
          And{' '}
          <span className={`${props.stylePrefix}-stat-text`}>
            {' '}
            {props.multiplayer.length}
          </span>{' '}
          were multiplayer.
        </p>
      )}

      <p>
        The Highest score from all games was
        <span className={`${props.stylePrefix}-stat-text`}>
          {' '}
          {max.score}
        </span>{' '}
        scored by the indefatigable
        <span className={`${props.stylePrefix}-stat-text`}> {max.name}</span>!
      </p>
      <p>
        And the lowest score of all time was
        <span className={`${props.stylePrefix}-stat-text`}>
          {' '}
          {min.score}
        </span>{' '}
        scored by the unstoppable
        <span className={`${props.stylePrefix}-stat-text`}> {min.name}</span>!
      </p>
      <p>
        The average score across all games is a respectable
        <span className={`${props.stylePrefix}-stat-text`}>
          {' '}
          {averageScore.toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default Stats;
