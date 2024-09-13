export const checkVictoryCondition = (diceValues) => {
  const counts = {};
  diceValues.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  const countValues = Object.values(counts);
  const maxCount = Math.max(...countValues);
  const pairCount = countValues.filter((count) => count >= 2).length;

  const sortedUniqueValues = [...new Set(diceValues)].sort((a, b) => a - b);
  const isStraight =
    sortedUniqueValues.length === 5 &&
    sortedUniqueValues[4] - sortedUniqueValues[0] === 4;

  if (isStraight) return 2; // => Suite
  if ((maxCount === 3 && pairCount === 2) || maxCount >= 4) return 2; // => Full / Carré
  if (maxCount === 3 || pairCount >= 2) return 1; // => Brelan / Double paire
  if (maxCount === 5) return 3; // => Yams
  return 0;
};
