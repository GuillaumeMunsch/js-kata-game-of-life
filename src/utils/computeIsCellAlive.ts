import { Coord, DeltaCoord, Cells, Cell } from "../game-of-life";

export const computeIsCellAliveNextRound = (
  isCurrentCellAlive: boolean,
  aliveNeighbors: number
) => aliveNeighbors === 3 || (isCurrentCellAlive && aliveNeighbors === 2);

const deltas: DeltaCoord[] = [
  { name: "Top left", dx: -1, dy: -1 },
  { name: "Top", dx: -1, dy: 0 },
  { name: "Top right", dx: -1, dy: 1 },
  { name: "Left", dx: 0, dy: -1 },
  { name: "Right", dx: 0, dy: 1 },
  { name: "Bottom left", dx: 1, dy: -1 },
  { name: "Bottom", dx: 1, dy: 0 },
  { name: "Bottom right", dx: 1, dy: 1 },
];

const computeNeighborCoord =
  (currentCell: Coord) =>
  (delta: DeltaCoord): Coord => ({
    x: currentCell.x + delta.dx,
    y: currentCell.y + delta.dy,
  });

//   .map<Cell>(({ x, y }) => `${x}|${y}`

export const findCellNeighbors = (currentCell: Coord): Coord[] =>
  deltas.map((delta) => computeNeighborCoord(currentCell)(delta));

export const findAliveNeighborsAmount = (
  currentCell: Coord,
  aliveCells: Cells
): number => {
  const neighbors = findCellNeighbors(currentCell);
  const aliveNeighbors = neighbors.filter(
    ({ x, y }) => !!aliveCells.has(`${x}|${y}`)
  );
  return aliveNeighbors.length;
};

// export const computeAllNeighbors = (aliveCells: Cells) => {
//     const allNeighbors = aliveCells.map()
// }

export const computeIsCellAlive = (
  currentCell: Coord,
  aliveCells: Cells
): boolean => {
  let aliveNeighborsAmount: number = findAliveNeighborsAmount(
    currentCell,
    aliveCells
  );
  //   const nextRoundCellState = computeIsCellAliveNextRound(
  //     game[coord.x][coord.y],
  //     aliveNeighbors
  //   );

  return nextRoundCellState;
};
