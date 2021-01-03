import React, { useState } from 'react';
import { dateFromString, dateRegex } from '../../helpers/date';
import {
  AgricolaGameScore,
  PlayerScore,
  SinglePlayerScore,
} from '../../models/game';
import {
  blankBaseGameScoreSheet,
  blankFarmersOfTheMoorScoreSheet,
} from '../../models/agricola/playerScore';
import ConfirmScoresModal from './ConfirmModal';
import AgricolaScoreSheet from './AgricolaScoreSheet';

interface PropsInterface {
  hideModal;
}

const AgricolaScoreModal = (props: PropsInterface) => {
  const [gameType, updateGameType] = useState(false);
  const scoreSheet = gameType
    ? blankBaseGameScoreSheet
    : blankFarmersOfTheMoorScoreSheet;
  const [errors, setErrors] = useState({ date: false });
  const [playerScores, setPlayerScores] = useState<Record<number, PlayerScore>>(
    {
      0: scoreSheet,
      1: scoreSheet,
      2: scoreSheet,
      3: scoreSheet,
      4: scoreSheet,
    },
  );
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);

  const [date, setDate] = useState<string>();
  const [location] = useState<string>();
  const [, setGameData] = useState<AgricolaGameScore>();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [totals, setTotals] = useState<SinglePlayerScore>();

  const validateDate = (dateString: string) => {
    if (!dateString.match(dateRegex)) {
      setErrors({ date: true });
    } else {
      const date = dateFromString(dateString);
      if (!date.getDate()) {
        setErrors({ date: true });
      } else {
        setErrors({ date: false });
        setDate(dateString);
      }
    }
  };

  const handleSubmit = () => {
    if (date === undefined) {
      setErrors({ date: true });
    } else if (!errors.date) {
      Object.entries(playerScores).forEach(([index, player]) => {
        if (Number(index) < numberOfPlayers) {
          const playerTotal = player.scores.reduce((total, categoryScore) => {
            return (total += categoryScore.value);
          }, 0);
          setTotals({ [player.name]: playerTotal, ...totals });
        }
      });

      const gameData: AgricolaGameScore = {
        players: Object.values(playerScores),
        location,
        date,
      };

      setGameData(gameData);
      setConfirmPopup(true);
    }
  };

  const handlePlayerScores = (scores: PlayerScore, index: number) => {
    setPlayerScores({ ...playerScores, [index]: scores });
  };

  const submitScores = () => {
    setConfirmPopup(false);
    props.hideModal();
  };

  const handleNumberOfPlayers = (numOfPlayers: number) => {
    setNumberOfPlayers(numOfPlayers);
  };

  return (
    <div className="agricola-modal modal">
      <button onClick={props.hideModal}>CLOSE X</button>
      {confirmPopup && (
        <ConfirmScoresModal
          cancel={() => setConfirmPopup(false)}
          submit={() => submitScores()}
          totals={totals}
        ></ConfirmScoresModal>
      )}
      <div className="form-container">
        <div className="form-metadata-container">
          <div className="game-info-container">
            <label>
              Date:
              <input
                type="text"
                onChange={(e) => validateDate(e.target.value)}
              ></input>
            </label>
            <label>
              Location: <input type="text"></input>
            </label>
          </div>
          {errors.date && (
            <p className="error-message">
              Please enter a date in the format dd/mm/yyyy
            </p>
          )}
          <div className="player-radio-container">
            <label>
              <input
                type="radio"
                value="1player"
                checked={numberOfPlayers === 1}
                onChange={() => handleNumberOfPlayers(1)}
              />
              1 Player
            </label>
            <label>
              <input
                type="radio"
                value="2player"
                checked={numberOfPlayers === 2}
                onChange={() => handleNumberOfPlayers(2)}
              />
              2 Player
            </label>
            <label>
              <input
                type="radio"
                value="3player"
                checked={numberOfPlayers === 3}
                onChange={() => handleNumberOfPlayers(3)}
              />
              3 Player
            </label>
            <label>
              <input
                type="radio"
                value="4player"
                checked={numberOfPlayers === 4}
                onChange={() => handleNumberOfPlayers(4)}
              />
              4 Player
            </label>
            <label>
              <input
                type="radio"
                value="5player"
                checked={numberOfPlayers === 5}
                onChange={() => handleNumberOfPlayers(5)}
              />
              5 Player
            </label>
          </div>
        </div>
        <div className="player-radio-container">
          <label>
            <input
              type="radio"
              value="basegame"
              checked={gameType === true}
              onChange={() => updateGameType(true)}
            />
            Base Game
          </label>
          <label>
            <input
              type="radio"
              value="moors"
              checked={gameType === false}
              onChange={() => updateGameType(false)}
            />
            Farmers Of The Moor
          </label>
        </div>
        <div className="score-input-container">
          {Object.entries(playerScores).map(
            ([index, playerForm]) =>
              Number(index) < numberOfPlayers && (
                <AgricolaScoreSheet
                  key={index}
                  playerScores={playerForm}
                  updateForm={(value) =>
                    handlePlayerScores(value, Number(index))
                  }
                  baseGame={gameType}
                ></AgricolaScoreSheet>
              ),
          )}
        </div>
      </div>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default AgricolaScoreModal;
