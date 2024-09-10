export const countDuplicates = (diceValues) => {
  const counts = {};
  diceValues.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
};

export const getSameDice = (duplicateCounts) => {
  return Math.max(...Object.values(duplicateCounts));
};

export const checkVictoryCondition = (diceValues) => {
  const duplicateCounts = countDuplicates(diceValues);
  const sameDiceCounts = getSameDice(duplicateCounts);

  if (sameDiceCounts >= 4) return 3;
  if (sameDiceCounts === 3) return 2;
  if (sameDiceCounts === 2) return 1;
  return 0;
};
