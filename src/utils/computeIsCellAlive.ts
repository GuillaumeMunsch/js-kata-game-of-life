import { Coord, DeltaCoord, Cells, Cell } from "../game-of-life";
import { cellToCoord, coordToCell } from "./transforms";

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

export const findAllConcernedCandidates = (
  currentAliveCells: Set<Cell>
): Set<Cell> =>
  new Set(
    Array.from(currentAliveCells)
      .map((cell) => [
        ...findCellNeighbors(cellToCoord(cell)),
        cellToCoord(cell),
      ])
      .flat()
      .map(coordToCell)
  );

export const computeNextGeneration = (aliveCells: Cells): Cells => {
  const concernedCandidates = findAllConcernedCandidates(aliveCells);
  const nextGeneration = Array.from(concernedCandidates).filter((cell) => {
    const cellNeighborsAmount = findAliveNeighborsAmount(
      cellToCoord(cell),
      aliveCells
    );
    const isCurrentCellAlive = aliveCells.has(cell);
    return computeIsCellAliveNextRound(isCurrentCellAlive, cellNeighborsAmount);
  });
  return new Set(nextGeneration);
};
