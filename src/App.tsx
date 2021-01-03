import React, { useEffect, useState } from 'react';
import './App.css';
import AgricolaPage from './Components/AgricolaPage';
import AgricolaScoreModal from './Components/AgricolaScoreModal';
import TerraformingMarsPage from './Components/TerraformingMarsPage';
import WingspanPage from './Components/WingspanPage';
import { fetchData } from './helpers/fetchData';
import { GameScore } from './models/game';

const App = () => {
  const [view, setView] = useState('Wingspan');
  const [showModal, setShowModal] = useState(false);
  const [agricolaGames, setAgricolaGames] = useState<GameScore[]>();
  const [wingspanGames, setWingspanGames] = useState<GameScore[]>();
  const [tmGames, setTmGames] = useState<GameScore[]>();

  useEffect(() => {
    const pword = `$2b$10$tVk${process.env.REACT_APP_API_KEY}`;
    const agricolaLocation = process.env.REACT_APP_AGRICOLA_LOCATION;
    const wingspanLocation = process.env.REACT_APP_WINGSPAN_LOCATION;
    const tmLocation = process.env.REACT_APP_TM_LOCATION;
    fetchData(
      pword,
      agricolaLocation,
    ).then((data: { agricolaGames: GameScore[] }) =>
      setAgricolaGames(data.agricolaGames),
    );
    fetchData(pword, wingspanLocation).then((data) =>
      setWingspanGames(data.wingspanGames),
    );
    fetchData(pword, tmLocation).then((data) => setTmGames(data.tmGames));
  }, []);

  if (wingspanGames && agricolaGames && tmGames) {
    return (
      <div className="App">
        <nav className="navbar">
          <button onClick={() => setView('Agricola')}>Agricola</button>
          <button onClick={() => setView('TerraformingMars')}>
            Terraforming Mars
          </button>
          <button onClick={() => setView('Wingspan')}>Wingspan</button>
        </nav>
        {view === 'Agricola' && (
          <AgricolaPage games={agricolaGames}></AgricolaPage>
        )}
        {view === 'TerraformingMars' && (
          <TerraformingMarsPage games={tmGames}></TerraformingMarsPage>
        )}
        {view === 'Wingspan' && (
          <WingspanPage games={wingspanGames}></WingspanPage>
        )}
        {showModal && (
          <AgricolaScoreModal
            hideModal={() => setShowModal(false)}
          ></AgricolaScoreModal>
        )}
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default App;
