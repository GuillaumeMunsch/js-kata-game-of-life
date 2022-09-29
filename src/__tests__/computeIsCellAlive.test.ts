import { Coord, Cells, Cell } from "../game-of-life";
import {
  computeIsCellAlive,
  computeIsCellAliveNextRound,
  findAliveNeighborsAmount,
  findCellNeighbors,
} from "../utils/computeIsCellAlive";

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

  it("Should find one alive neighor", () => {
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

describe("Find a cell's neighbors", () => {
  it("Should find all cell's neighbors", () => {
    // Given
    const currentCell: Coord = { x: 0, y: 0 };
    const mySortMethod = (a: Coord, b: Coord) => a.x + a.y - b.x + b.y;

    // When
    const neighbors = findCellNeighbors(currentCell);

    // Then
    const expectedArray = [
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
    ];
    expect(neighbors.sort(mySortMethod)).toEqual(
      expectedArray.sort(mySortMethod)
    );
  });
});

// describe("Compute classic cell state", () => {
//   it("Should die when it has less than 2 alive neighbors", () => {
//     // Given
//     const currentCell: Coord = { x: 0, y: 0 };
//     const aliveCells: AliveCells = new Set<Cell>(["0|0"]);

//     // When
//     const cellIsAlive = computeIsCellAlive(currentCell, aliveCells);

//     // Then
//     expect(cellIsAlive).toEqual(false);
//   });

//   it("Should live when it has 2 alive neighbors", () => {
//     // Given
//     const game: Game = [
//       [dead, alive, dead],
//       [dead, alive, dead],
//       [dead, alive, dead],
//     ];
//     const coord: Coord = {
//       x: 1,
//       y: 1,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(true);
//   });

//   it("Should live when it has 2 other alive neighbors", () => {
//     // Given
//     const game: Game = [
//       [alive, dead, dead],
//       [dead, alive, dead],
//       [dead, dead, alive],
//     ];
//     const coord: Coord = {
//       x: 1,
//       y: 1,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(true);
//   });

//   it("Should live when it has 3 other alive neighbors", () => {
//     // Given
//     const game: Game = [
//       [alive, dead, alive],
//       [dead, alive, dead],
//       [dead, dead, alive],
//     ];
//     const coord: Coord = {
//       x: 1,
//       y: 1,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(true);
//   });

//   it("Should die when it has 4 or more alive neighbors", () => {
//     // Given
//     const game: Game = [
//       [alive, dead, alive],
//       [alive, alive, dead],
//       [dead, dead, alive],
//     ];
//     const coord: Coord = {
//       x: 1,
//       y: 1,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(false);
//   });

//   it("Should revive when it is dead and has exactly 3 neighbors", () => {
//     // Given
//     const game: Game = [
//       [alive, dead, alive],
//       [alive, dead, dead],
//       [dead, dead, dead],
//     ];
//     const coord: Coord = {
//       x: 1,
//       y: 1,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(true);
//   });

//   it("Should not revive when it is dead and has exactly 2 alive neighbors", () => {
//     // Given
//     const game: Game = [
//       [alive, dead, dead],
//       [alive, dead, dead],
//       [dead, dead, dead],
//     ];
//     const coord: Coord = {
//       x: 1,
//       y: 1,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(false);
//   });
// });

// describe("Edge cases", () => {
//   it("Should die when it has less than 2 alive neighbors", () => {
//     // Given
//     const game: Game = [
//       [alive, dead, dead],
//       [dead, dead, dead],
//       [dead, dead, dead],
//     ];
//     const coord: Coord = {
//       x: 0,
//       y: 0,
//     };

//     // When
//     const cellIsAlive = computeIsCellAlive(game, coord);

//     // Then
//     expect(cellIsAlive).toEqual(false);
//   });
// });
