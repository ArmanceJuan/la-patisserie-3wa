import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rollDice } from "../slices/diceSlice";
import { decrement, addPastries } from "../slices/gameSlice";
import { checkVictoryCondition } from "../components/VictoryCondition";

const Play = () => {
  const dispatch = useDispatch();
  const { dice } = useSelector((state) => state.dice);
  const { value: remainingAttempts, totalPastries } = useSelector(
    (state) => state.game
  );
  const [currentRollResult, setCurrentRollResult] = React.useState(null);

  const handleRoll = () => {
    dispatch(rollDice());
    dispatch(decrement());
    const pastriesWon = checkVictoryCondition(dice);
    dispatch(addPastries(pastriesWon));
    setCurrentRollResult(pastriesWon);
  };

  useEffect(() => {
    if (remainingAttempts === 0) {
      // Le jeu est terminé, vous pouvez ajouter une logique supplémentaire ici si nécessaire
    }
  }, [remainingAttempts]);

  return (
    <div className="play-container">
      <h1>Jouer</h1>
      <div className="dice-container">
        {dice.map((value, index) => (
          <span key={index} className="dice">
            {value}
          </span>
        ))}
      </div>
      <p>Essais restants : {remainingAttempts}</p>
      <p>Total de pâtisseries gagnées : {totalPastries}</p>
      {remainingAttempts > 0 ? (
        <button onClick={handleRoll}>Lancer les dés</button>
      ) : (
        <p>Le jeu est terminé !</p>
      )}
      {currentRollResult !== null && (
        <p>
          {currentRollResult > 0
            ? `Vous avez gagné ${currentRollResult} pâtisserie(s) sur ce lancer !`
            : "Pas de pâtisserie gagnée sur ce lancer."}
        </p>
      )}
    </div>
  );
};

export default Play;
