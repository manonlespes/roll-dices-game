import { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Dice } from "./Dice";
import { v4 as uuidv4 } from "uuid";
import { diesArrayType } from "./types/dice";

function App() {
  const [dices, setDices] = useState(getDices());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const isValueEqual = dices.every(
      (dice) => dice.value === dices[0].value && dice.isHeld
    );

    if (isValueEqual) {
      setTenzies(true);
      console.log("you won");
    } else {
      console.log("not");
    }
  }, [dices]);

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
    setDices((oldDice) =>
      oldDice.map((dice) => {
        return !dice.isHeld ? generateNewDice() : dice;
      })
    );
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
        {/*  <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p> */}
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
          <button type="button" onClick={rollDice}>
            Roll
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
