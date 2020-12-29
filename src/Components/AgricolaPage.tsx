import React, { useState, useEffect } from "react";
import PieCharts from "./PieCharts";
import FinalScoresBar from "./FinalScoresBar";
import CategoryAverage from "./CategoryAverages";
import Stats from "./Stats";
import MultiplayerRadial from "./MultiplayerRadial";
import ScatterRelationships from "./ScatterRelationships";
import { scoresForEachPlayer } from "../helpers/scoreCalculations";
import { AgricolaGameScore, PlayerAllScores } from "../models/game";
import agricola from "../images/agricolaheader.png";
import { dateRegex } from "../helpers/date";
import { fetchData } from "../helpers/fetchData";

interface apiData {
  agricolaGames: AgricolaGameScore[];
}

const AgricolaPage = () => {
  const [allGames, setAllGames] = useState<AgricolaGameScore[]>();
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<AgricolaGameScore[]>();
  const [multiplayer, setMultiplayer] = useState<AgricolaGameScore[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pword = `$2b$10$tVk${process.env.REACT_APP_AGRICOLA_API_KEY}`;
    const location = process.env.REACT_APP_AGRICOLA_LOCATION;
    setIsLoading(true);
    fetchData(pword, location).then((data: apiData) => {
      setAllGames(data.agricolaGames);
      setTotals(scoresForEachPlayer(data.agricolaGames));
      setTashVsThom(
        data.agricolaGames.filter((game) => game.players.length === 2)
      );
      setMultiplayer(
        data.agricolaGames.filter((game) => game.players.length > 2)
      );
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={agricola} alt="agricola-header"></img>
          </div>
        </div>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          multiplayer={multiplayer}
          allGames={allGames}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom}></PieCharts>
        <FinalScoresBar
          games={allGames.filter((game) => game.date.match(dateRegex))}
          twoPlayer={tashVsThom.filter((game) => game.date.match(dateRegex))}
          multiplayer={multiplayer.filter((game) => game.date.match(dateRegex))}
        ></FinalScoresBar>
        <CategoryAverage
          games={allGames}
          twoPlayer={tashVsThom}
          multiplayer={multiplayer}
        ></CategoryAverage>
        <MultiplayerRadial
          multiplayer={multiplayer}
          twoPlayer={tashVsThom}
          allGames={allGames}
        ></MultiplayerRadial>
        <ScatterRelationships allGames={allGames}></ScatterRelationships>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default AgricolaPage;
