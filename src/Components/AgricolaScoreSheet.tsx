import React, { useState } from "react";
import {
  blankBaseGameScoreSheet,
  blankFarmersOfTheMoorScoreSheet,
} from "../models/agricola/playerScore";
import { PlayerScore } from "../models/game";

interface Props {
  playerScores: PlayerScore;
  updateForm;
  baseGame: boolean;
}

const AgricolaScoreSheet = (props: Props) => {
  const scoreSheet = props.baseGame
    ? blankBaseGameScoreSheet
    : blankFarmersOfTheMoorScoreSheet;
  return (
    <div className="form-player">
      <label className="category-label">
        Name:
        <input
          type="text"
          value={props.playerScores.name}
          onChange={(e) =>
            props.updateForm({
              name: e.target.value,
              scores: props.playerScores.scores,
            })
          }
        />
      </label>
      <div className="category-scores-grid">
        {scoreSheet.scores.map((cat, i) => (
          <label className="category-label" key={i}>
            {cat.category[0].toUpperCase().concat(cat.category.toString().slice(1))}
            <input
              type="number"
              value={
                props.playerScores.scores.find(
                  (sc) => sc.category === cat.category
                ).value
              }
              className="category-input"
              onChange={(e) =>
                props.updateForm({
                  name: props.playerScores.name,
                  scores: [
                    { category: cat.category, value: e.target.value },
                    ...props.playerScores.scores.filter(
                      (sc) => sc.category !== cat.category
                    ),
                  ],
                })
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default AgricolaScoreSheet;
