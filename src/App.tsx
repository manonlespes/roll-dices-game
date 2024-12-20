import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import { Dice } from "./Dice";
import { v4 as uuidv4 } from "uuid";
import { diesArrayType } from "./types/dice";
import ReactConfetti from "react-confetti";

function App() {
  // use state receive a fct in callback
  // avoid re-render the App component each time the state changes
  const [dices, setDices] = useState(() => getDices());
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  const isGameWon = dices.every(
    (dice) => dice.value === dices[0].value && dice.isHeld
  );

  useEffect(() => {
    if (isGameWon && buttonRef.current != null) {
      buttonRef.current.focus();
    }
  }, [isGameWon]);

  function generateNewDice() {
    const random = Math.ceil(Math.random() * 6);
    return {
      id: uuidv4(),
      value: random,
      isHeld: false,
    };
  }

  function getDices() {
    const diesArray: diesArrayType[] = [];

    for (let die = 0; die < 10; die++) {
      diesArray.push(generateNewDice());
    }

    return diesArray;
  }

  const rollDice = () => {
    if (isGameWon) {
      setDices(getDices());
    } else {
      setDices((oldDice) =>
        oldDice.map((dice) => {
          return !dice.isHeld ? generateNewDice() : dice;
        })
      );
    }
  };

  const holdDice = (id: string) => {
    setDices((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  };

  return (
    <main>
      <div className="container">
        {isGameWon && <ReactConfetti />}

        <div aria-live="polite" className="sr-only">
          {isGameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>

        <div className="header">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="wrapper">
          {dices.map((diceValue: diesArrayType) => {
            return (
              <Fragment key={diceValue.id}>
                <Dice
                  dice={diceValue}
                  handleClick={() => holdDice(diceValue.id)}
                />
              </Fragment>
            );
          })}
          <button
            ref={buttonRef}
            className="submit"
            type="button"
            onClick={rollDice}
          >
            {isGameWon ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
