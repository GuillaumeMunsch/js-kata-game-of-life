export type Coord = {
  x: number;
  y: number;
};

export type DeltaCoord = {
  dx: number;
  dy: number;
  name?: string;
};

export type Cell = `${number}|${number}`;

export type Cells = Set<Cell>;

const GameOfLife = () => {
  //   const game: Game = [
  //     [alive, dead],
  //     [dead, alive],
  //   ];
  return (
    <div>
      {/* {game.map((row) => {
        return <div>{row.map((cell) => cell)}</div>;
      })} */}
    </div>
  );
};

export default GameOfLife;
