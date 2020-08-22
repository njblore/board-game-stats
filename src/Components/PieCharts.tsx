import PieChart from "./SinglePie";
import React from "react";
import { winCounts } from "../helpers/scoreCalculations";
import { colours } from "../models/colourScheme";

const PieCharts = (props) => {
  return (
    <div className="pie-container container">
      <header className="header">Win Lose Draw!</header>
      <PieChart
        scores={winCounts(props.tashVsThom)}
        backgroundColor={Object.values(colours)}
      ></PieChart>
    </div>
  );
};

export default PieCharts;
