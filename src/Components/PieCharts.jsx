import TwoPlayerPie from './2PlayerPie';
import React from 'react';

const PieCharts = props => {
  return (
    <div className="pie-container">
      <header className="chart-header">HEAD 2 HEAD: Thom vs Tash</header>
      <div className="pie-grid">
        <TwoPlayerPie
          title={'Travelling In Asia'}
          tashVsThom={props.tashVsThom.filter(game => game.location === 'Asia')}
          backgroundColor={['green', 'yellow', 'orange']}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Un-Recorded Location'}
          tashVsThom={props.tashVsThom.filter(
            game => game.location === 'unknown',
          )}
          backgroundColor={['lavender', 'powderblue', 'peachpuff']}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Living In Australia'}
          tashVsThom={props.tashVsThom.filter(
            game => game.location === 'Australia',
          )}
          backgroundColor={['blue', 'red', 'white']}
        ></TwoPlayerPie>
        <TwoPlayerPie
          title={'Home In The Uk'}
          tashVsThom={props.tashVsThom.filter(game => game.location === 'UK')}
          backgroundColor={['red', 'white', 'blue']}
        ></TwoPlayerPie>
        <TwoPlayerPie
          tashVsThom={props.tashVsThom}
          title={'All Games'}
          backgroundColor={['#36A2EB', '#FF6384', '#FFCE56']}
        ></TwoPlayerPie>
      </div>
    </div>
  );
};

export default PieCharts;
