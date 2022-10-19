import { Coord, Cells, Cell } from "../game-of-life";
import {
  computeIsCellAlive,
  computeIsCellAliveNextRound,
  computeNextGeneration,
  findAliveNeighborsAmount,
  findAllConcernedCandidates,
  findCellNeighbors,
} from "../utils/computeIsCellAlive";

const equalSet = <T>(xs: Set<T>, ys: Set<T>) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));

describe("Find alive neighbors amount", () => {
  it("Should find no alive neighor", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const aliveCells: Cells = new Set<Cell>(["0|0"]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(
      currentCell,
      aliveCells
    );

    // Then
    expect(aliveNeighborsAmount).toEqual(0);
  });

  it("Should find one alive neighor", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const aliveCells: Cells = new Set<Cell>(["1|0"]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(
      currentCell,
      aliveCells
    );

    // Then
    expect(aliveNeighborsAmount).toEqual(1);
  });

  it("Should find one alive neighor with negative coord", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const aliveCells: Cells = new Set<Cell>(["0|-1"]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(
      currentCell,
      aliveCells
    );

    // Then
    expect(aliveNeighborsAmount).toEqual(1);
  });

  it("Should find 8 alive neighors", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const aliveCells: Cells = new Set<Cell>([
      "0|1",
      "0|-1",
      "1|-1",
      "1|0",
      "1|1",
      "-1|1",
      "-1|0",
      "-1|-1",
    ]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(
      currentCell,
      aliveCells
    );

    // Then
    expect(aliveNeighborsAmount).toEqual(8);
  });

  it("Should find 1 alive neighors", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const aliveCells: Cells = new Set<Cell>(["0|1", "10|-1", "2|0", "0|0"]);

    // When
    const aliveNeighborsAmount = findAliveNeighborsAmount(
      currentCell,
      aliveCells
    );

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
    const aliveCells: Cells = new Set<Cell>(["0|0"]);

    // When
    const allCandidates = findAllConcernedCandidates(aliveCells);
    const expectedCandidates = new Set<Cell>([
      "0|1",
      "0|0",
      "0|-1",
      "1|1",
      "1|0",
      "1|-1",
      "-1|1",
      "-1|0",
      "-1|-1",
    ]);

    // Then
    expect(equalSet(allCandidates, expectedCandidates)).toEqual(true);
  });

  it("Should find 9 candidates for 1|1", () => {
    // Given
    const aliveCells: Cells = new Set<Cell>(["1|1"]);

    // When
    const allCandidates = findAllConcernedCandidates(aliveCells);
    const expectedCandidates = new Set<Cell>([
      "1|0",
      "1|1",
      "1|2",
      "0|0",
      "0|1",
      "0|2",
      "2|0",
      "2|1",
      "2|2",
    ]);

    // Then
    expect(equalSet(allCandidates, expectedCandidates)).toEqual(true);
  });

  it("Should find 9 candidates for 1|1 and 2|2", () => {
    // Given
    const aliveCells: Cells = new Set<Cell>(["1|1", "2|2"]);

    // When
    const allCandidates = findAllConcernedCandidates(aliveCells);
    const expectedCandidates = new Set<Cell>([
      "0|0",
      "0|1",
      "0|2",
      "1|0",
      "1|1",
      "1|2",
      "1|3",
      "2|0",
      "2|1",
      "2|2",
      "2|3",
      "3|1",
      "3|2",
      "3|3",
    ]);

    // Then
    expect(equalSet(allCandidates, expectedCandidates)).toEqual(true);
  });
});

describe("Compute next generation", () => {
  it("Should compute next gen 1", () => {
    // Given
    const currentAliveCells = new Set<Cell>(["0|0", "0|1", "1|0"]);

    // When
    const nextGeneration = computeNextGeneration(currentAliveCells);

    // Then
    const expectedNextGeneration = new Set<Cell>(["0|0", "0|1", "1|0", "1|1"]);
    expect(equalSet(expectedNextGeneration, nextGeneration)).toEqual(true);
  });

  it("Should compute next gen 2", () => {
    // Given
    const currentAliveCells = new Set<Cell>([
      "0|0",
      "0|1",
      "0|2",
      "-1|1",
      "1|2",
    ]);

    // When
    const nextGeneration = computeNextGeneration(currentAliveCells);

    // Then
    const expectedNextGeneration = new Set<Cell>([
      "0|0",
      "-1|0",
      "-1|1",
      "-1|2",
      "0|2",
      "1|2",
    ]);
    expect(equalSet(expectedNextGeneration, nextGeneration)).toEqual(true);
  });
});
