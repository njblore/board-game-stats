import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = (props) => {
  const labels = Object.keys(props.scores).map((player) => {
    return player === "draw" ? "Draw" : `${player} Wins`;
  });
  const scoresData = Object.values(props.scores);
  console.log(scoresData);
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

  const totalGames = Object.values(props.scores).reduce(
    (acc, val) => (acc += val)
  );

  const winPercentages = Object.entries(props.scores).map(
    ([player, winCount]) => {
      return player === "draw"
        ? `${Math.floor(
            (winCount / totalGames) * 100
          )}% of games ended in a draw!`
        : `${player} has won ${Math.floor(
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
