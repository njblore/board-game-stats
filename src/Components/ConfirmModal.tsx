import { env } from "process";
import React, { useState } from "react";
import { totalScore } from "../helpers/scoreCalculations";
import { SinglePlayerScore } from "../models/game";

interface PropsInterface {
  cancel;
  submit;
  totals: SinglePlayerScore;
}

const ConfirmScoresModal = (props: PropsInterface) => {
  const [password, setPassword] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handleSubmit = () => {
    if (password === process.env.REACT_APP_SUBMIT_PASSWORD) {
      setIncorrectPassword(false);
      props.submit();
    } else {
      setIncorrectPassword(true);
    }
  };
  return (
    <div className="confirm-modal modal">
      <div>
        {Object.entries(props.totals).map(([name, total]) => (
          <p key={name}>
            {name} scored {total}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="confirm-button-container">
        <button onClick={() => handleSubmit()}>Confirm</button>
        <button onClick={props.cancel}>Cancel</button>
      </div>
      {incorrectPassword && (
        <p className="error-message">Oops! Wrong Password</p>
      )}
    </div>
  );
};

export default ConfirmScoresModal;
