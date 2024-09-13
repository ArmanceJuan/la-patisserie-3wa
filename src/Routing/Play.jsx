import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rollDice, stopDice } from "../slices/diceSlice";
import { decrement, addPastries } from "../slices/gameSlice";
import { useCheckAuthQuery } from "../slices/apiSlice";
import { checkVictoryCondition } from "../components/VictoryCondition";
import "./Play.scss";

const Play = () => {
  const { data: user, isLoading } = useCheckAuthQuery();
  const dispatch = useDispatch();
  const { dice } = useSelector((state) => state.dice);
  const { value: remainingAttempts, totalPastries } = useSelector(
    (state) => state.game
  );
  const [currentRollResult, setCurrentRollResult] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const handleRoll = () => {
    dispatch(rollDice());
    dispatch(decrement());
  };

  const handleStopDice = (index) => {
    dispatch(stopDice(index));
  };

  const handleEndGame = () => {
    const pastriesWon = checkVictoryCondition(dice.map((die) => die.value));
    if (pastriesWon > 0) {
      dispatch(addPastries(pastriesWon));
    }
    setCurrentRollResult(pastriesWon);
    setGameFinished(true);
  };

  useEffect(() => {
    if (remainingAttempts === 0 && !gameFinished) {
      handleEndGame();
    }
  }, [remainingAttempts, dispatch, dice, gameFinished]);

  if (!user) {
    return (
      <>
        <h1>Connectez-vous pour jouer !</h1>
        <button>
          <a href="/login">Connexion</a>
        </button>
      </>
    );
  }

  return (
    <div className="play-page">
      <h1>Jeu du Yams</h1>
      <div className="rules">
        <p>Vous avez 3 lancés.</p>
        <p>
          Si vous obtenez une paire (deux dés identiques), vous gagnez 1
          pâtisserie.
        </p>
        <p>
          Avec un brelan (trois dés identiques), vous remportez 3 pâtisseries.
        </p>
        <p>Un carré (quatre dés identiques) vous donne 4 pâtisseries.</p>
        <p>Accumulez les délices pour remporter la partie !</p>
      </div>
      <div className="dice-container">
        {dice.map((die, index) => (
          <span
            key={index}
            className={`dice ${die.locked ? "locked" : ""}`}
            onClick={() => handleStopDice(index)}
          >
            {die.value}
          </span>
        ))}
      </div>
      <p>Essais restants : {remainingAttempts}</p>
      <p>Total de pâtisseries gagnées : {totalPastries}</p>
      {remainingAttempts > 0 && !gameFinished ? (
        <>
          <button onClick={handleRoll}>Lancer les dés</button>
          <button onClick={handleEndGame}>Valider et terminer</button>
        </>
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
