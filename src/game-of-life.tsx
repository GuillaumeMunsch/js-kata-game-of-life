export type Coord = {
  x: number;
  y: number;
};

export type DeltaCoord = {
  dx: number;
  dy: number;
  name?: string;
};

export type Game = Cell[][];

export type Cell = Alive | Dead;
export type Alive = "▣";
export type Dead = "□";

export const alive: Alive = "▣";
export const dead: Dead = "□";

const GameOfLife = () => {
  const game: Game = [
    [alive, dead],
    [dead, alive],
  ];
  return (
    <div>
      {game.map((row) => {
        return <div>{row.map((cell) => cell)}</div>;
      })}
    </div>
  );
};

export default GameOfLife;
