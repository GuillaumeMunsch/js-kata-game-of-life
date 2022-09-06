import { alive, Coord, Game, DeltaCoord, Cell } from "../game-of-life";

const isCoord = (coord: Coord | null): coord is Coord => coord !== null;

const computeIsCellAliveNextRound = (
  currentCell: Cell,
  aliveNeighbors: number
) => aliveNeighbors === 3 || (currentCell === alive && aliveNeighbors === 2);

const computeNeighborCoord =
  (game: Game, cellCoord: Coord) =>
  (delta: DeltaCoord): Coord | null => {
    const neighborCoord: Coord = {
      x: cellCoord.x + delta.dx,
      y: cellCoord.y + delta.dy,
    };
    if (neighborCoord.x < 0 || neighborCoord.y < 0) return null;
    if (neighborCoord.x >= game.length) return null;
    if (neighborCoord.y >= game[0].length) return null;

    return neighborCoord;
  };

const isCellAlive = (game: Game) => (coord: Coord) =>
  game[coord.x][coord.y] === alive;

const findAliveNeighbors = (game: Game, cellCoord: Coord): number => {
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

  return deltas
    .map(computeNeighborCoord(game, cellCoord))
    .filter(isCoord)
    .filter(isCellAlive(game)).length;
};

export const computeIsCellAlive = (game: Game, coord: Coord): boolean => {
  let aliveNeighbors = findAliveNeighbors(game, coord);
  const nextRoundCellState = computeIsCellAliveNextRound(
    game[coord.x][coord.y],
    aliveNeighbors
  );

  return nextRoundCellState;
};
