import React, { useEffect, useState } from 'react';
import { dateRegex } from '../helpers/date';
import {
  getGameCategories,
  scoresForEachPlayer,
} from '../helpers/scoreCalculations';
import wingspanbirdheader from '../images/wingspanbirdheader.jpeg';
import { GameScore, PlayerAllScores } from '../models/game';
import formattedWingspanScores from '../data/formattedWingspanScores.json';
import CategoryAverage from './CategoryAverages';
import FinalScoresBar from './FinalScoresBar';
import PieCharts from './PieCharts';
import ScatterRelationships from './ScatterRelationships';
import Stats from './Stats';

const WingspanPage = () => {
  const [allGames, setAllGames] = useState<GameScore[]>();
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>();

  const games: GameScore[] = formattedWingspanScores.games;

  useEffect(() => {
    setIsLoading(true);
    setAllGames(games);
    setTotals(scoresForEachPlayer(games));
    setTashVsThom(games.filter((game) => game.players.length === 2));
    setCategories(getGameCategories(games[0]));
    setIsLoading(false);
  }, [allGames, games]);

  if (!isLoading) {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={wingspanbirdheader} alt="wingspan-header"></img>
          </div>
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
