import React from 'react';
import { RadialChart } from 'react-vis';

const PieChartTotals = props => {
  const data = [
    { angle: props.maxes['Thom'], label: 'Thom' },
    { angle: props.maxes['Tash'], label: 'Tash' },
    { angle: props.maxes['draw'], label: 'Draw' },
  ];
  return (
    <div>
      <header>PIE CHART</header>
      <p>Thom Wins : {props.maxes['Thom']}</p>
      <p>Tash Wins : {props.maxes['Tash']}</p>
      <p>DRAWS : {props.maxes['draw']}</p>

      <RadialChart data={data} width={300} height={300} />
    </div>
  );
};

export default PieChartTotals;
