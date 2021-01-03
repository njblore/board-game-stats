import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getPlayers } from '../../helpers/getPlayers';
import { scoresForEachPlayer } from '../../helpers/scoreCalculations';
import { GameScore, PlayerAllScores } from '../../models/game';
import { dateFromString } from '../../helpers/date';
import { namedColours } from '../../models/agricola/colourScheme';
import './scores-time.css';

interface Props {
  twoPlayer: GameScore[];
  multiplayer?: GameScore[];
  games: GameScore[];
  stylePrefix: string;
}

const ScoresOverTime = (props: Props) => {
  const [pool, setPool] = useState<GameScore[]>(props.twoPlayer);

  const players = getPlayers(pool);
  const scores: PlayerAllScores = scoresForEachPlayer(pool);

  const sets = players.map((player, i) => {
    return {
      label: player,
      fill: false,
      borderColor: namedColours[player],
      borderWidth: 2.0,
      hoverBackgroundColor: 'rgb(54, 174, 201)',
      hoverBorderColor: 'black',
      data: scores[player],
      lineTension: 0.1,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: namedColours[player],
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: namedColours[player],
      pointHoverBorderColor: namedColours[player],
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    };
  });

  const data = {
    labels: pool.map((game) => dateFromString(game.date).toDateString()),
    datasets: sets,
    options: {
      scales: {
        xAxes: [
          {
            type: 'time',
          },
        ],
      },
    },
  };

  return (
    <div
      className={`scores-time-container grid-six ${props.stylePrefix}-scores-time`}
    >
      <header className="header">Scores Over Time</header>
      {props.multiplayer !== undefined && (
        <div className="button-container">
          <button
            className={`state-button ${
              pool === props.twoPlayer ? 'highlighted' : ''
            }`}
            onClick={() => setPool(props.twoPlayer)}
          >
            Two Player
          </button>

          <button
            className={`state-button ${
              pool === props.multiplayer ? 'highlighted' : ''
            }`}
            onClick={() => setPool(props.multiplayer)}
          >
            Multiplayer
          </button>

          <button
            className={`state-button ${
              pool === props.games ? 'highlighted' : ''
            }`}
            onClick={() => setPool(props.games)}
          >
            All Games
          </button>
        </div>
      )}
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default ScoresOverTime;
