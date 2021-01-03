import PieChart from './SinglePie';
import React from 'react';
import { winCounts } from '../../helpers/scoreCalculations';
import { colours } from '../../models/agricola/colourScheme';
import './pie-chart.css';
import { GameScore } from '../../models/game';

interface Props {
  tashVsThom: GameScore[];
  stylePrefix: string;
}

const PieCharts = (props: Props) => {
  return (
    <div className={`grid-three pie-container ${props.stylePrefix}-pie`}>
      <header className={`header ${props.stylePrefix}-header`}>
        Win Lose Draw!
      </header>
      <PieChart
        scores={winCounts(props.tashVsThom)}
        backgroundColor={Object.values(colours)}
        stylePrefix={props.stylePrefix}
      ></PieChart>
    </div>
  );
};

export default PieCharts;
