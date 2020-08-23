import React from "react";
import { totalScore } from "../helpers/scoreCalculations";
import { SinglePlayerScore } from "../models/playerScore";

interface PropsInterface {
  cancel;
  submit;
  totals: SinglePlayerScore;
}

const ConfirmScoresModal = (props: PropsInterface) => {
  return (
    <div className="confirm-modal modal">
      <div>
        {Object.values(props.totals).map((total) => (
          <p>
            {total[0]} scored {total[1]}
          </p>
        ))}
      </div>
      <button onClick={props.submit}>Confirm</button>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  );
};

export default ConfirmScoresModal;
