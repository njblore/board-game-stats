import React, { useState, useEffect } from "react";
import PieCharts from "./PieCharts";
import FinalScoresBar from "./FinalScoresBar";
import CategoryAverage from "./CategoryAverages";
import Stats from "./Stats";
import MultiplayerRadial from "./MultiplayerRadial";
import ScatterRelationships from "./ScatterRelationships";
import { scoresForEachPlayer } from "../helpers/scoreCalculations";
import axios from "axios";
import { GameScore } from "../models/agricola/game";
import { PlayerAllScores } from "../models/agricola/playerScore";
import agricola from "../images/agricolaheader.png";
import { dateRegex } from "../helpers/date";

interface apiData {
  agricolaGames: GameScore[];
}

const AgricolaPage = () => {
  const [allGames, setAllGames] = useState<GameScore[]>();
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [multiplayer, setMultiplayer] = useState<GameScore[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pword = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        "https://api.jsonbin.io/b/5ea01b9b2940c704e1dc9684/latest",
        {
          headers: {
            "secret-key": `$2b$10$tVk${pword}`,
          },
        }
      );
      return result.data;
    };
    fetchData().then((data: apiData) => {
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
            <img src={agricola}></img>
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
