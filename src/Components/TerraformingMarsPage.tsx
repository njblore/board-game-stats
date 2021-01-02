import React, { useEffect, useState } from 'react';
import { dateRegex } from '../helpers/date';
import { fetchData } from '../helpers/fetchData';
import {
  getGameCategories,
  scoresForEachPlayer,
} from '../helpers/scoreCalculations';
import tmheader from '../images/tmboxheader.png';
import { GameScore, PlayerAllScores } from '../models/game';
import CategoryScores from './CategoryScores';
import PieCharts from './PieCharts';
import ScatterRelationships from './ScatterRelationships';
import FinalScoresBar from './ScoresOverTime';
import Stats from './Stats';
interface apiData {
  tmGames: GameScore[];
}
const TerraformingMarsPage = () => {
  const [allGames, setAllGames] = useState<GameScore[]>();
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [multiplayer, setMultiplayer] = useState<GameScore[]>();
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pword = `$2b$10$tVk${process.env.REACT_APP_API_KEY}`;
    const location = process.env.REACT_APP_TM_LOCATION;
    setIsLoading(true);
    fetchData(pword, location).then((data: apiData) => {
      setAllGames(data.tmGames);
      setTotals(scoresForEachPlayer(data.tmGames));
      setTashVsThom(data.tmGames.filter((game) => game.players.length === 2));
      setMultiplayer(data.tmGames.filter((game) => game.players.length > 2));
      setCategories(getGameCategories(data.tmGames[0]));
      setIsLoading(false);
    });
  }, []);
  if (!isLoading) {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={tmheader} alt="terraforming-mars-header"></img>
          </div>
        </div>
        <div className="container photo-container"></div>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          allGames={allGames}
          multiplayer={multiplayer}
          gameName={'Terraforming Mars'}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom}></PieCharts>
        <FinalScoresBar
          games={allGames.filter((game) => game.date.match(dateRegex))}
          twoPlayer={tashVsThom.filter((game) => game.date.match(dateRegex))}
        ></FinalScoresBar>
        <CategoryScores games={allGames}></CategoryScores>
        <ScatterRelationships
          allGames={allGames}
          categories={categories}
        ></ScatterRelationships>
      </div>
    );
  } else {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={tmheader} alt="tm-header"></img>
          </div>
        </div>
        <div>loading...</div>
      </div>
    );
  }
};

export default TerraformingMarsPage;
