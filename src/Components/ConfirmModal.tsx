import React from "react";
import { totalScore } from "../helpers/scoreCalculations";
import { SinglePlayerScore } from "../models/playerScore";

interface PropsInterface {
  cancel;
  submit;
  totals: SinglePlayerScore;
}

const ConfirmScoresModal = (props: PropsInterface) => {
  console.log(props.totals);
  return (
    <div className="confirm-modal modal">
      <div>
        {Object.entries(props.totals).map(([name, total]) => (
          <p key={name}>
            {name} scored {total}
          </p>
        ))}
      </div>
      <button onClick={props.submit}>Confirm</button>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  );
};

export default ConfirmScoresModal;
