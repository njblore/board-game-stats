import React, { useEffect, useState } from 'react';
// Components
import CategoryScores from './category-scores/CategoryScores';
import PieCharts from './pie-chart/PieCharts';
import ScatterRelationships from './scatter-relationships/ScatterRelationships';
import ScoresOverTime from './scores-over-time/ScoresOverTime';
import Stats from './stats/Stats';
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
import Header from './header/header';

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
      <div className="page-container tm-body">
        <Header imageUrl={tmheader}></Header>
        <div className="container"></div>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          allGames={props.games}
          multiplayer={multiplayer}
          gameName={'Terraforming Mars'}
          stylePrefix={'tm'}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom} stylePrefix={'tm'}></PieCharts>
        <ScoresOverTime
          games={props.games.filter((game) => game.date.match(dateRegex))}
          stylePrefix={'tm'}
          twoPlayer={tashVsThom.filter((game) => game.date.match(dateRegex))}
        ></ScoresOverTime>
        <CategoryScores games={props.games} stylePrefix={'tm'}></CategoryScores>
        <ScatterRelationships
          allGames={props.games}
          stylePrefix={'tm'}
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
