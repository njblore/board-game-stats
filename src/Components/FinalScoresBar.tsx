import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { getPlayers } from "../helpers/getPlayers";
import { scoresForEachPlayer } from "../helpers/scoreCalculations";
import { colours } from "../models/colourScheme";
import { GameScore } from "../models/game";
import { dateFromString, dateRegex } from "../helpers/date";
import { PlayerAllScores } from "../models/playerScore";

const FinalScoresBar = (props) => {
  const [pool, setPool] = useState<GameScore[]>(props.twoPlayer);

  const players = getPlayers(pool);
  const scores: PlayerAllScores = scoresForEachPlayer(pool);

  const sets = players.map((player, i) => {
    return {
      label: player,
      backgroundColor: Object.values(colours)[i],
      borderColor: "black",
      borderWidth: 0.5,
      hoverBackgroundColor: "rgb(54, 174, 201)",
      hoverBorderColor: "black",
      data: scores[player],
    };
  });

  const data = {
    labels: pool.map((game) => dateFromString(game.date).toDateString()),
    datasets: sets,
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
          },
        ],
      },
    },
  };

  return (
    <div className="bar-container container">
      <header className="header">Final Scores</header>
      <div className="button-container">
        <button
          className="agricola-button"
          onClick={() => setPool(props.twoPlayer)}
        >
          Two Player
        </button>
        <button
          className="agricola-button"
          onClick={() => setPool(props.multiplayer)}
        >
          Multiplayer
        </button>
        <button
          className="agricola-button"
          onClick={() => setPool(props.games)}
        >
          All Games
        </button>
      </div>
      <Bar data={data} />
    </div>
  );
};

export default FinalScoresBar;
