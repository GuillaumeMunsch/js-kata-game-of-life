import { Coord, Cell } from "../game-of-life";
import { cellToCoord, coordToCell } from "../utils/transforms";

describe("cellToCoord", () => {
  it("Should transform '0|0' in {x: 0, y: 0}", () => {
    // Given
    const cell: Cell = "0|0";
    const coord: Coord = { x: 0, y: 0 };

    // When
    const foundCoord = cellToCoord(cell);

    // Then
    expect(foundCoord).toEqual(coord);
  });
});

describe("coordToCell", () => {
  it("Should transform {x: 0, y: 0} in '0|0'", () => {
    // Given
    const coord: Coord = { x: 0, y: 0 };
    const cell: Cell = "0|0";

    // When
    const foundCell = coordToCell(coord);

    // Then
    expect(foundCell).toEqual(cell);
  });
});
