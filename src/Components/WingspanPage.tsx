import React, { useEffect, useState } from 'react';
import { dateRegex } from '../helpers/date';
import {
  getGameCategories,
  scoresForEachPlayer,
} from '../helpers/scoreCalculations';
import wingspanbirdheader from '../images/wingspanbirdheader.jpeg';
import wingspancards from '../images/wingspancards.jpeg';
import { GameScore, PlayerAllScores } from '../models/game';
import CategoryAverage from './CategoryAverages';
import FinalScoresBar from './FinalScoresBar';
import PieCharts from './PieCharts';
import ScatterRelationships from './ScatterRelationships';
import Stats from './Stats';
import { fetchData } from '../helpers/fetchData';

interface apiData {
  wingspanGames: GameScore[];
}

const WingspanPage = () => {
  const [allGames, setAllGames] = useState<GameScore[]>();
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pword = `$2b$10$tVk${process.env.REACT_APP_API_KEY}`;
    const location = process.env.REACT_APP_WINGSPAN_LOCATION;
    setIsLoading(true);
    fetchData(pword, location).then((data: apiData) => {
      setAllGames(data.wingspanGames);
      setTotals(scoresForEachPlayer(data.wingspanGames));
      setTashVsThom(
        data.wingspanGames.filter((game) => game.players.length === 2),
      );
      setCategories(getGameCategories(data.wingspanGames[0]));
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={wingspanbirdheader} alt="wingspan-header"></img>
          </div>
        </div>
        <div className="container photo-container">
          <img
            src={wingspancards}
            alt="cards from the game wingspan"
            className="photo"
          ></img>
        </div>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          allGames={allGames}
          gameName={'Wingspan'}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom}></PieCharts>
        <FinalScoresBar
          games={allGames.filter((game) => game.date.match(dateRegex))}
          twoPlayer={tashVsThom.filter((game) => game.date.match(dateRegex))}
        ></FinalScoresBar>
        <CategoryAverage
          games={allGames}
          twoPlayer={tashVsThom}
        ></CategoryAverage>
        <ScatterRelationships
          allGames={allGames}
          categories={categories}
        ></ScatterRelationships>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default WingspanPage;
