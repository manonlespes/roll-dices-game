import { Fragment, useState } from "react";
import "./App.css";
import { Dice } from "./Dice";

type diesArrayType = {
  value: number;
  isHeld: boolean;
};

function App() {
  const [dices, setDices] = useState(getDies());

  function getDies() {
    const diesArray: diesArrayType[] = [];
    for (let die = 0; die < 10; die++) {
      const random = Math.floor(Math.random() * 6 + 1);
      diesArray.push({ value: random, isHeld: false });
    }
    return diesArray;
  }

  const rollDice = () => {
    setDices(getDies());
  };

  return (
    <main>
      <div className="container">
        <div className="wrapper">
          {dices.map((diceValue: diesArrayType, index: number) => {
            return (
              <Fragment key={index}>
                <Dice value={diceValue.value} />
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
