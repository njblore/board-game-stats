import React, { useEffect, useState } from 'react';
// Components
import CategoryScores from './CategoryScores';
import PieCharts from './PieCharts';
import ScatterRelationships from './ScatterRelationships';
import FinalScoresBar from './ScoresOverTime';
import Stats from './Stats';
// Models
import { GamePageProps, GameScore, PlayerAllScores } from '../models/game';
// Data
import tmheader from '../images/tmboxheader.png';
// Helpers
import { dateRegex } from '../helpers/date';
import { scoresForEachPlayer } from '../helpers/scoreCalculations';
import {
  getGameCategories,
  divideGamesByPlayerCount,
} from '../helpers/setData';

const TerraformingMarsPage = (props: GamePageProps) => {
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [multiplayer, setMultiplayer] = useState<GameScore[]>();
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTotals(scoresForEachPlayer(props.games));
    const [twoPlayer, multiplayer] = divideGamesByPlayerCount(props.games);
    setTashVsThom(twoPlayer);
    setMultiplayer(multiplayer);
    setCategories(getGameCategories(props.games[0]));
    setIsLoading(false);
  }, [props.games]);

  if (!isLoading) {
    return (
      <div className="page-container">
        <div className="page-header header">
          <div className="image-container">
            <img src={tmheader} alt="terraforming-mars-header"></img>
          </div>
        </div>
        <div className="container"></div>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          allGames={props.games}
          multiplayer={multiplayer}
          gameName={'Terraforming Mars'}
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
            <img src={tmheader} alt="tm-header"></img>
          </div>
        </div>
        <div>loading...</div>
      </div>
    );
  }
};

export default TerraformingMarsPage;
