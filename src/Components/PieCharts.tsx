import PieChart from "./SinglePie";
import React from "react";
import { winCounts } from "../helpers/scoreCalculations";

const PieCharts = (props) => {
  return (
    <div className="pie-container container">
      <header className="header">Win Lose Draw!</header>
      <PieChart
        scores={winCounts(props.tashVsThom)}
        backgroundColor={["#36A2EB", "#FF6384", "#FFCE56"]}
      ></PieChart>
      {/* <div className="button-container">
        <button className="agricola-button" onClick={() => setPool(props.twoPlayer)}>Two Player</button>
        <button className="agricola-button" onClick={() => setPool(props.multiplayer)}>Multiplayer</button>
      </div> */}
    </div>
  );
};

export default PieCharts;
