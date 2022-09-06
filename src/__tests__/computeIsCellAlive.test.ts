import { dead, Coord, alive, Game } from "../game-of-life";
import { computeIsCellAlive } from "../utils/computeIsCellAlive";

describe("Compute classic cell state", () => {
  it("Should die when it has less than 2 alive neighbors", () => {
    // Given
    const game: Game = [
      [dead, alive, dead],
      [dead, alive, dead],
      [dead, dead, dead],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(false);
  });

  it("Should live when it has 2 alive neighbors", () => {
    // Given
    const game: Game = [
      [dead, alive, dead],
      [dead, alive, dead],
      [dead, alive, dead],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(true);
  });

  it("Should live when it has 2 other alive neighbors", () => {
    // Given
    const game: Game = [
      [alive, dead, dead],
      [dead, alive, dead],
      [dead, dead, alive],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(true);
  });

  it("Should live when it has 3 other alive neighbors", () => {
    // Given
    const game: Game = [
      [alive, dead, alive],
      [dead, alive, dead],
      [dead, dead, alive],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(true);
  });

  it("Should die when it has 4 or more alive neighbors", () => {
    // Given
    const game: Game = [
      [alive, dead, alive],
      [alive, alive, dead],
      [dead, dead, alive],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(false);
  });

  it("Should revive when it is dead and has exactly 3 neighbors", () => {
    // Given
    const game: Game = [
      [alive, dead, alive],
      [alive, dead, dead],
      [dead, dead, dead],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(true);
  });

  it("Should not revive when it is dead and has exactly 2 alive neighbors", () => {
    // Given
    const game: Game = [
      [alive, dead, dead],
      [alive, dead, dead],
      [dead, dead, dead],
    ];
    const coord: Coord = {
      x: 1,
      y: 1,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(false);
  });
});

describe("Edge cases", () => {
  it("Should die when it has less than 2 alive neighbors", () => {
    // Given
    const game: Game = [
      [alive, dead, dead],
      [dead, dead, dead],
      [dead, dead, dead],
    ];
    const coord: Coord = {
      x: 0,
      y: 0,
    };

    // When
    const cellIsAlive = computeIsCellAlive(game, coord);

    // Then
    expect(cellIsAlive).toEqual(false);
  });
});
