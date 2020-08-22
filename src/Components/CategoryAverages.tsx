import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { getPlayers } from "../helpers/getPlayers";
import { blankScoreSheet, PlayerCategoryScores } from "../helpers/scoreSheet";
import { categoryScoresForEachPlayer } from "../helpers/scoreCalculations";

const CategoryAverage = (props) => {
  const [pool, setPool] = useState(props.games);
  const players = getPlayers(pool);

  const blankScores: PlayerCategoryScores = blankScoreSheet(players);
  const categoryScores: PlayerCategoryScores = categoryScoresForEachPlayer(
    pool,
    blankScores
  );

  let averages: PlayerCategoryScores = players.reduce((acc, player) => {
    acc[player] = {};
    return acc;
  }, {});

  for (let player in categoryScores) {
    for (let category in categoryScores[player]) {
      if (categoryScores[player][category].length > 0) {
        let total = categoryScores[player][category].reduce(
          (acc, score) => (acc += score)
        );

        let avg = total / categoryScores[player][category].length;
        averages[player][category] = avg.toFixed(2);
      }
    }
  }

  const categories = Object.keys(averages.Thom);
  const getAverages = (name) => {
    return Object.entries(averages[name])
      .filter(([category, _]) => category !== "total")
      .map(([_, value]) => value);
  };
  const colours = [
    "#ff57bd",
    "yellow",
    "#14c017",
    "#2b74fe",
    "orange",
    "#9814c0",
    "white",
    "red",
  ];
  const sets = players.map((player, i) => {
    return {
      label: player,
      backgroundColor: colours[i],
      borderColor: "black",
      borderWidth: 0.5,
      hoverBackgroundColor: colours[i],
      hoverBorderColor: "black",
      data: getAverages(player),
    };
  });
  const data = {
    labels: categories.filter((category) => category !== "total"),
    datasets: sets,
  };

  return (
    <div className="category-container container">
      <header className="header">Category Averages</header>
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
      <Bar data={data}></Bar>
    </div>
  );
};

export default CategoryAverage;
