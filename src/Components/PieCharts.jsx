import TwoPlayerPie from './2PlayerPie';
import React from 'react';

const PieCharts = props => {
  return (
    <div className="pie-container">
      <header>HEAD 2 HEAD: Thom vs Tash</header>
      <div className="pie-grid">
        <TwoPlayerPie
          tashVsThom={props.tashVsThom}
          title={'All Games'}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Travelling In Asia'}
          tashVsThom={props.tashVsThom.filter(game => game.location === 'Asia')}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Living In Australia'}
          tashVsThom={props.tashVsThom.filter(
            game => game.location === 'Australia',
          )}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Home In The Uk'}
          tashVsThom={props.tashVsThom.filter(game => game.location === 'UK')}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Un-Recorded Location'}
          tashVsThom={props.tashVsThom.filter(
            game => game.location === 'unknown',
          )}
        ></TwoPlayerPie>
      </div>
    </div>
  );
};

export default PieCharts;
