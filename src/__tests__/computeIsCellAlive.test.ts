import { Coord } from "../game-of-life";
import {
  computeIsCellAliveNextRound,
  computeNextGeneration,
  findAliveNeighborsAmount,
  findAllConcernedCandidates,
} from "../utils/computeIsCellAlive";
import Grid from "../utils/grid";

describe("Find alive neighbors amount", () => {
  it("Should find no alive neighor", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const grid: Grid = new Grid([{ x: 0, y: 0 }]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(currentCell, grid);

    // Then
    expect(aliveNeighborsAmount).toEqual(0);
  });

  it("Should find one alive neighor", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const grid: Grid = new Grid([{ x: 1, y: 0 }]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(currentCell, grid);

    // Then
    expect(aliveNeighborsAmount).toEqual(1);
  });

  it("Should find one alive neighor with negative coord", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const grid: Grid = new Grid([{ x: 0, y: -1 }]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(currentCell, grid);

    // Then
    expect(aliveNeighborsAmount).toEqual(1);
  });

  it("Should find 8 alive neighors", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const grid: Grid = new Grid([
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
    ]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(currentCell, grid);

    // Then
    expect(aliveNeighborsAmount).toEqual(8);
  });

  it("Should find 1 alive neighors", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const grid = new Grid([
      { x: 0, y: 1 },
      { x: 10, y: -1 },
      { x: 2, y: 0 },
      { x: 0, y: 0 },
    ]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(currentCell, grid);

    // Then
    expect(aliveNeighborsAmount).toEqual(1);
  });
});

describe("Compute is cell alive on next iteration", () => {
  it("Should be dead on the next round with 0 alive neighbors", () => {
    // Given
    const isCurrentCellAlive: boolean = false;
    const aliveCellsAmount: number = 0;

    // When
    const cellIsAliveOnNextIteration = computeIsCellAliveNextRound(
      isCurrentCellAlive,
      aliveCellsAmount
    );

    // Then
    expect(cellIsAliveOnNextIteration).toEqual(false);
  });

  it("Should be alive on the next round with 3 alive neighbors", () => {
    // Given
    const isCurrentCellAlive: boolean = false;
    const aliveCellsAmount: number = 3;

    // When
    const cellIsAliveOnNextIteration = computeIsCellAliveNextRound(
      isCurrentCellAlive,
      aliveCellsAmount
    );

    // Then
    expect(cellIsAliveOnNextIteration).toEqual(true);
  });

  it("Should be dead on the next round with 4 alive neighbors", () => {
    // Given
    const isCurrentCellAlive: boolean = false;
    const aliveCellsAmount: number = 4;

    // When
    const cellIsAliveOnNextIteration = computeIsCellAliveNextRound(
      isCurrentCellAlive,
      aliveCellsAmount
    );

    // Then
    expect(cellIsAliveOnNextIteration).toEqual(false);
  });

  it("Should be alive on the next round with 2 alive neighbors when currently alive", () => {
    // Given
    const isCurrentCellAlive: boolean = true;
    const aliveCellsAmount: number = 2;

    // When
    const cellIsAliveOnNextIteration = computeIsCellAliveNextRound(
      isCurrentCellAlive,
      aliveCellsAmount
    );

    // Then
    expect(cellIsAliveOnNextIteration).toEqual(true);
  });

  it("Should be dead on the next round with 2 alive neighbors when currently dead", () => {
    // Given
    const isCurrentCellAlive: boolean = false;
    const aliveCellsAmount: number = 2;

    // When
    const cellIsAliveOnNextIteration = computeIsCellAliveNextRound(
      isCurrentCellAlive,
      aliveCellsAmount
    );

    // Then
    expect(cellIsAliveOnNextIteration).toEqual(false);
  });
});

describe("Find all candidates", () => {
  it("Should find 9 candidates for 0|0", () => {
    // Given
    const grid: Grid = new Grid([{ x: 0, y: 0 }]);

    // When
    const allCandidates = findAllConcernedCandidates(grid);
    const expectedCandidates = new Grid([
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]);

    // Then
    expect(allCandidates.equals(expectedCandidates)).toEqual(true);
  });

  it("Should find 9 candidates for 1|1", () => {
    // Given
    const aliveCells = new Grid([{ x: 1, y: 1 }]);

    // When
    const allCandidates = findAllConcernedCandidates(aliveCells);
    const expectedCandidates = new Grid([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);

    // Then
    expect(allCandidates.equals(expectedCandidates)).toEqual(true);
  });

  it("Should find 9 candidates for 1|1 and 2|2", () => {
    // Given
    const aliveCells = new Grid([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);

    // When
    const allCandidates = findAllConcernedCandidates(aliveCells);
    const expectedCandidates = new Grid([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
    ]);

    // Then
    expect(allCandidates.equals(expectedCandidates)).toEqual(true);
  });
});

describe("Compute next generation", () => {
  it("Should compute next gen 1", () => {
    // Given
    const currentAliveCells = new Grid([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ]);

    // When
    const nextGeneration = computeNextGeneration(currentAliveCells);

    // Then
    const expectedNextGeneration = new Grid([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]);

    expect(nextGeneration.equals(expectedNextGeneration)).toEqual(true);
  });

  it("Should compute next gen 2", () => {
    // Given
    const currentAliveCells = new Grid([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: -1, y: 1 },
      { x: 1, y: 2 },
    ]);

    // When
    const nextGeneration = computeNextGeneration(currentAliveCells);

    // Then
    const expectedNextGeneration = new Grid([
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: -1, y: 2 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]);
    expect(nextGeneration.equals(expectedNextGeneration)).toEqual(true);
  });
});
