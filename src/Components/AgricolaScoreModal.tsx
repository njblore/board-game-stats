import React, { useState } from "react";
import { blankPlayerScoreSheet, PlayerScore } from "../models/playerScore";
import AgricolaScoreSheet from "./AgricolaScoreSheet";

const AgricolaScoreModal = (props) => {
  const [player1Form, setPlayer1Form] = useState<PlayerScore>(
    blankPlayerScoreSheet
  );
  const [player2Form, setPlayer2Form] = useState<PlayerScore>(
    blankPlayerScoreSheet
  );
  const [player3Form, setPlayer3Form] = useState<PlayerScore>(
    blankPlayerScoreSheet
  );
  const [player4Form, setPlayer4Form] = useState<PlayerScore>(
    blankPlayerScoreSheet
  );
  const [player5Form, setPlayer5Form] = useState<PlayerScore>(
    blankPlayerScoreSheet
  );
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const allPlayerForms = [
    player1Form,
    player2Form,
    player3Form,
    player4Form,
    player5Form,
  ];

  const handleSubmit = () => {};

  const handlePlayerScores = (scores: PlayerScore, index: number) => {
    switch (index) {
      case 1:
        setPlayer1Form(scores);
        break;
      case 2:
        setPlayer2Form(scores);
        break;
      case 3:
        setPlayer3Form(scores);
        break;
      case 4:
        setPlayer4Form(scores);
        break;
      case 5:
        setPlayer5Form(scores);
        break;
    }
  };

  const handleNumberOfPlayers = (numOfPlayers: number) => {
    setNumberOfPlayers(numOfPlayers);
  };

  return (
    <div className="agricola-modal modal">
      <button onClick={props.hideModal}>CLOSE X</button>
      <div className="form-container">
        <div className="form-metadata-container">
          <div className="game-info-container">
            <label>
              Date: <input type="text"></input>
            </label>
            <label>
              Location: <input type="text"></input>
            </label>
          </div>
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
        <div className="score-input-container">
          {allPlayerForms.slice(0, numberOfPlayers).map((playerForm, index) => (
            <AgricolaScoreSheet
              playerScores={playerForm}
              updateForm={(value) => handlePlayerScores(value, index + 1)}
            ></AgricolaScoreSheet>
          ))}
        </div>
      </div>
      <button>Submit</button>
    </div>
  );
};

export default AgricolaScoreModal;
