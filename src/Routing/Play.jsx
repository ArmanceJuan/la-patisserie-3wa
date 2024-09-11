import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rollDice } from "../slices/diceSlice";
import { decrement, addPastries } from "../slices/gameSlice";
import { checkVictoryCondition } from "../components/VictoryCondition";
import "./Play.scss";

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
  };

  useEffect(() => {
    if (remainingAttempts < 3) {
      const pastriesWon = checkVictoryCondition(dice);
      if (pastriesWon > 0) {
        dispatch(addPastries(pastriesWon));
      }
      setCurrentRollResult(pastriesWon);
    }
  }, [dice, remainingAttempts, dispatch]);

  return (
    <div className="play-page">
      <h1>Jeu du yams</h1>
      <div className="rules">
        <p>Vous avez 3 lancés.</p>
        <p>
          Si vous obtenez une paire (deux dés identoques), vous gagnez 1
          pâtisserie.
        </p>
        <p>
          Avec un brelan (trois dés identiques), vous remportez 3 pâtisseries.
        </p>
        <p>
          Et en cas de carré (quatredés identiques), vous remportez 3
          pâtisseries.
        </p>
        <p>Accumulez les délices pour remportez la partie !</p>
      </div>
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
        <p className="game-over-message">Le jeu est terminé !</p>
      )}
      {currentRollResult !== null && (
        <p
          className={
            currentRollResult > 0 ? "result-message" : "no-win-message"
          }
        >
          {currentRollResult > 0
            ? `Vous avez gagné ${currentRollResult} pâtisserie(s) sur ce lancer !`
            : "Pas de pâtisserie gagnée sur ce lancer."}
        </p>
      )}
    </div>
  );
};

export default Play;
