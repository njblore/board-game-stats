import React, { useState } from "react";
import { Polar } from "react-chartjs-2";
import {
  scoresForEachPlayer,
  averageScoresFromObject,
} from "../helpers/scoreCalculations";

const MultiplayerRadial = (props) => {
  const [set, setSet] = useState(props.multiplayer);
  let allScores = scoresForEachPlayer(set);

  let playerAverages = averageScoresFromObject(allScores);

  const data = {
    datasets: [
      {
        data: Object.values(playerAverages),
        backgroundColor: [
          "#ff57bd",
          "yellow",
          "#14c017",
          "#2b74fe",
          "orange",
          "#9814c0",
          "white",
          "red",
        ],
        label: "",
      },
    ],
    labels: Object.keys(playerAverages),
  };
  const legendOpts = {
    display: true,
    position: "right",
    fullWidth: false,
    reverse: false,
    labels: {
      fontColor: "greysmoke",
    },
  };
  return (
    <div className="radial-container container">
      <header className="header">Average Game Scores</header>

      <div className="button-container">
        <button
          className="agricola-button"
          onClick={() => setSet(props.twoPlayer)}
        >
          Two Player
        </button>
        <button
          className="agricola-button"
          onClick={() => setSet(props.multiplayer)}
        >
          Mutliplayer
        </button>
        <button
          className="agricola-button"
          onClick={() => setSet(props.allGames)}
        >
          All Games
        </button>
      </div>
      <Polar data={data} legend={legendOpts}></Polar>
    </div>
  );
};

export default MultiplayerRadial;
