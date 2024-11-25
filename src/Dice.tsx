import { diesArrayType } from "./types/dice";

export const Dice = ({
  dice,
  handleClick,
}: {
  dice: diesArrayType;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`dice ${dice.isHeld && "colored"}`}
      onClick={handleClick}
      aria-pressed={dice.isHeld}
      aria-label={`Die with value ${dice.value}, 
      ${dice.isHeld ? "held" : "not held"}`}
    >
      <span>{dice.value}</span>
    </button>
  );
};
