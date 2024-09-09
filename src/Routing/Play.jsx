import { useSelector, useDispatch } from "react-redux";
import { decrement } from "../slices/gameSlice.jsx";
import { rollDice } from "../slices/diceSlice.jsx";

const Play = () => {
  const count = useSelector((state) => state.game.value);
  const dice = useSelector((state) => state.dice.dice);
  const dispatch = useDispatch();

  const handleRoll = () => {
    dispatch(rollDice());
    dispatch(decrement());
  };

  return (
    <div>
      <div>
        <h1>Play</h1>
        <div>
          {dice.map((value, index) => (
            <span key={index} style={{ margin: "0 10px", fontSize: "24px" }}>
              {value}
            </span>
          ))}
        </div>
        <span>{count}</span>
        {count > 0 ? (
          <button aria-label="Decrement value" onClick={handleRoll}>
            Jouer
          </button>
        ) : (
          <p>Perdu !</p>
        )}
      </div>
    </div>
  );
};

export default Play;
