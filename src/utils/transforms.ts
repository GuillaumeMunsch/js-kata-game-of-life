import { Coord, Cell } from "../game-of-life";

export const cellToCoord = (cell: Cell): Coord => {
  const [x, y] = cell.split("|");
  return {
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  };
};

export const coordToCell = ({ x, y }: Coord): Cell => `${x}|${y}`;
