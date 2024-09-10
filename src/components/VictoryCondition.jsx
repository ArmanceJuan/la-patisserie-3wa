export const checkVictoryCondition = (diceValues) => {
  const counts = {};
  diceValues.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  const countValues = Object.values(counts);
  const maxCount = Math.max(...countValues);
  const pairCount = countValues.filter((count) => count >= 2).length;

  if (maxCount >= 4) return 3;
  if (maxCount === 3 && pairCount === 2) return 3;
  if (maxCount === 3) return 2;
  if (pairCount >= 2) return 2;
  if (maxCount === 2) return 1;
  return 0;
};
