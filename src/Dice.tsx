import { diesArrayType } from "./types/dice";

export const Dice = ({
  dice,
  handleClick,
}: {
  dice: diesArrayType;
  handleClick: () => void;
}) => {
  return (
    <div className={`dice ${dice.isHeld && "colored"}`} onClick={handleClick}>
      <span>{dice.value}</span>
    </div>
  );
};
