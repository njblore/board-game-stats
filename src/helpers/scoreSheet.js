export const blankScoreSheet = players => {
  return players.reduce((acc, player) => {
    acc[player] = {
      fields: [],
      pastures: [],
      grain: [],
      vegetables: [],
      sheep: [],
      'wild boar': [],
      cattle: [],
      'unused spaces': [],
      'fenced stables': [],
      'clay rooms': [],
      'stone rooms': [],
      'family members': [],
      'points for cards': [],
      'bonus points': [],
    };
    return acc;
  }, {});
};
