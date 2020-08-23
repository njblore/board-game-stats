import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { dataPointForTopic } from "../helpers/chartDataManipulation";
import { colours } from "../models/colourScheme";

const ScatterRelationships = (props) => {
  const [topic, setTopic] = useState("family members");

  const options = {
    responsive: true,
    labels: dataPointForTopic("family members", props.allGames)
      .sort((a, b) => (a.x > b.x ? 1 : -1))
      .map((score) => score.y),
    tooltips: {
      mode: "label",
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          labels: dataPointForTopic("family members", props.allGames)
            .sort((a, b) => (a.x > b.x ? 1 : -1))
            .map((score) => score.x),
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  const data = {
    datasets: [
      {
        label: "Score",
        type: "line",
        data: dataPointForTopic(topic, props.allGames)
          .sort((a, b) => (a.x > b.x ? 1 : -1))
          .map((score) => score.x),
        fill: false,
        borderColor: colours.purple,
        backgroundColor: colours.pink,
        pointBorderColor: colours.purple,
        pointBackgroundColor: colours.pink,
        pointHoverBackgroundColor: colours.orange,
        pointHoverBorderColor: colours.orange,
        yAxisID: "y-axis-2",
      },
      {
        type: "bar",
        label: topic,
        data: dataPointForTopic(topic, props.allGames)
          .sort((a, b) => (a.x > b.x ? 1 : -1))
          .map((score) => score.y),
        fill: false,
        backgroundColor: colours.yellow,
        borderColor: "black",
        hoverBackgroundColor: colours.purple,
        hoverBorderColor: colours.purple,
        yAxisID: "y-axis-1",
      },
    ],
  };

  return (
    <div className="scatter-container container">
      <header className="header">Scattered Relationships</header>
      <Bar data={data} options={options}></Bar>
      <div className="button-container">
        <button
          className="agricola-button"
          onClick={() => setTopic("family members")}
        >
          Family Members
        </button>
        <button
          className="agricola-button"
          onClick={() => setTopic("bonus points")}
        >
          Bonus Points
        </button>
        <button
          className="agricola-button"
          onClick={() => setTopic("points for cards")}
        >
          Points For Cards
        </button>
        <button
          className="agricola-button"
          onClick={() => setTopic("stone rooms")}
        >
          Stone Hut Rooms
        </button>
        <button
          className="agricola-button"
          onClick={() => setTopic("unused spaces")}
        >
          Unused Spaces
        </button>
      </div>
    </div>
  );
};

export default ScatterRelationships;
