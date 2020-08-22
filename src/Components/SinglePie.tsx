import React from "react";
import { Doughnut } from "react-chartjs-2";
import { SinglePlayerScore } from "../models/playerScore";

const PieChart = (props) => {
  const labels = Object.keys(props.scores).map((player) => {
    return player === "draw" ? "Draw" : `${player} Wins`;
  });
  const scoresData = Object.values(props.scores);

  const data = {
    labels,
    datasets: [
      {
        data: scoresData,
        backgroundColor: props.backgroundColor,
        hoverBackgroundColor: props.backgroundColor,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
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

  const totalGames = Object.values(props.scores as SinglePlayerScore).reduce(
    (acc, val) => (acc += val)
  );

  const winPercentages = Object.entries(props.scores as SinglePlayerScore).map(
    ([player, winCount]) => {
      return player === "draw"
        ? `${Math.round(
            (winCount / totalGames) * 100
          )}% of games ended in a draw!`
        : `${player} has won ${Math.round(
            (winCount / totalGames) * 100
          )}% of games`;
    }
  );

  return (
    <div className="pie-grid">
      <Doughnut data={data} legend={legendOpts}></Doughnut>
      <div>
        {winPercentages.map((string) => (
          <p className="win-stats">{string}</p>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
