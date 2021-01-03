import React, { useEffect, useState } from 'react';
// Components
import CategoryScores from './CategoryScores';
import FinalScoresBar from './ScoresOverTime';
import PieCharts from './PieCharts';
import ScatterRelationships from './ScatterRelationships';
import Stats from './Stats';
// Models
import { GamePageProps, GameScore, PlayerAllScores } from '../models/game';
// Data
import wingspanbirdheader from '../images/wingspanbirdheader.jpeg';
import wingspancards from '../images/wingspancards.jpeg';
// Helpers
import { dateRegex } from '../helpers/date';
import { scoresForEachPlayer } from '../helpers/scoreCalculations';
import {
  divideGamesByPlayerCount,
  getGameCategories,
} from '../helpers/setData';

const WingspanPage = (props: GamePageProps) => {
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTotals(scoresForEachPlayer(props.games));
    const [twoPlayer] = divideGamesByPlayerCount(props.games);
    setTashVsThom(twoPlayer);
    setCategories(getGameCategories(props.games[0]));
    setIsLoading(false);
  }, [props.games]);

  if (!isLoading) {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={wingspanbirdheader} alt="wingspan-header"></img>
          </div>
        </div>
        <div className="container wingspan-photo-container">
          <img
            src={wingspancards}
            alt="cards from the game wingspan"
            className="photo"
          ></img>
        </div>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          allGames={props.games}
          gameName={'Wingspan'}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom}></PieCharts>
        <FinalScoresBar
          games={props.games.filter((game) => game.date.match(dateRegex))}
          twoPlayer={tashVsThom.filter((game) => game.date.match(dateRegex))}
        ></FinalScoresBar>
        <CategoryScores games={props.games}></CategoryScores>
        <ScatterRelationships
          allGames={props.games}
          categories={categories}
        ></ScatterRelationships>
      </div>
    );
  } else {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={wingspanbirdheader} alt="wingspan-header"></img>
          </div>
        </div>
        <div>loading...</div>
      </div>
    );
  }
};

export default WingspanPage;
