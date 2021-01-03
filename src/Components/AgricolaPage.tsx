import React, { useEffect, useState } from 'react';
// Components
import PieCharts from './pie-chart/PieCharts';
import ScoresOverTime from './scores-over-time/ScoresOverTime';
import CategoryScores from './category-scores/CategoryScores';
import Stats from './stats/Stats';
import MultiplayerRadial from './multiplayer-radial/MultiplayerRadial';
import ScatterRelationships from './scatter-relationships/ScatterRelationships';
// Models
import { GamePageProps, GameScore, PlayerAllScores } from '../models/game';
// Data
import agricola from '../images/agricolaheader.png';
// Helpers
import { scoresForEachPlayer } from '../helpers/scoreCalculations';
import { dateRegex } from '../helpers/date';
import {
  getGameCategories,
  divideGamesByPlayerCount,
} from '../helpers/setData';
import Header from './header/header';

const AgricolaPage = (props: GamePageProps) => {
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
      <div className="page-container agricola-body">
        <Header imageUrl={agricola}></Header>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          multiplayer={multiplayer}
          allGames={props.games}
          gameName={'Agricola'}
          stylePrefix={'agricola'}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom}></PieCharts>
        <ScoresOverTime
          games={props.games.filter((game) => game.date.match(dateRegex))}
          twoPlayer={tashVsThom.filter((game) => game.date.match(dateRegex))}
          multiplayer={multiplayer.filter((game) => game.date.match(dateRegex))}
        ></ScoresOverTime>
        <CategoryScores
          games={props.games}
          stylePrefix={'agricola'}
        ></CategoryScores>
        <MultiplayerRadial
          multiplayer={multiplayer}
          twoPlayer={tashVsThom}
          allGames={props.games}
        ></MultiplayerRadial>
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
            <img src={agricola} alt="agricola header"></img>
          </div>
        </div>
        <div>loading...</div>
      </div>
    );
  }
};

export default AgricolaPage;
