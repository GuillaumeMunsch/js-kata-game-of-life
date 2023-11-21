import { Coord, DeltaCoord } from "../game-of-life";
import Grid from "./grid";

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

export const findAliveNeighborsAmount = (currentCell: Coord, grid: Grid): number => {
  const neighbors = findCellNeighbors(currentCell);
  const aliveNeighbors = neighbors.filter(grid.has);
  return aliveNeighbors.length;
};

export const findAllConcernedCandidates = (grid: Grid): Grid =>
  grid.enhancedMap((coord) => [...findCellNeighbors(coord), coord]);

export const computeNextGeneration = (aliveGrid: Grid): Grid => {
  const concernedCandidates = findAllConcernedCandidates(aliveGrid);
  return concernedCandidates.filter((cell) => {
    const cellNeighborsAmount = findAliveNeighborsAmount(cell, aliveGrid);
    const isCurrentCellAlive = aliveGrid.has(cell);
    return computeIsCellAliveNextRound(isCurrentCellAlive, cellNeighborsAmount);
  });
};
