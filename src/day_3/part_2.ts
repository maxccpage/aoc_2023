import { inputIterator } from "../shared/utils";

const SYMBOL_REGEX = /[^0-9.]/g;
const NUMBER_REGEX = /^[0-9]\d*$/;

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

type BaseNumber = {
  values: string[];
  x?: number; // row index
  y1?: number; // start of number (col index)
  y2?: number; // end of number (inclusive)
};

const sumGearRatios = (nums: number[]) =>
  nums.reduce<number>((acc, curr) => (acc += curr), 0);

const getMaxMatrixDimensions = (input: string): [number, number] => {
  const lines = input.split("\n") ?? [];
  const row = lines[0] ?? "";
  return [row.length - 1, lines.length - 1];
};

export default (input: string) => {
  const MIN_ROW_INDEX = 0;
  const MIN_COLUMN_INDEX = 0;
  const [MAX_ROW_INDEX, MAX_COLUMN_INDEX] = getMaxMatrixDimensions(input);

  const isValidCoord = (coord: [number, number]) => {
    const [x, y] = coord;
    return (
      x >= MIN_ROW_INDEX &&
      x <= MAX_ROW_INDEX &&
      y >= MIN_COLUMN_INDEX &&
      y <= MAX_COLUMN_INDEX
    );
  };

  const getCoordRange = (x: number, y1: number, y2: number) => {
    const all_coords: [number, number][] = [];

    for (let i = y1; i < y2 + 1; i++) {
      all_coords.push([x, i]);
    }

    return all_coords;
  };

  const ADJACENT_COORDS_MAP: {
    [key in Direction]: (coords: [number, number]) => [number, number] | null;
  } = {
    up: ([x, y]) => (isValidCoord([x, y - 1]) ? [x, y - 1] : null),
    down: ([x, y]) => (isValidCoord([x, y + 1]) ? [x, y + 1] : null),
    left: ([x, y]) => (isValidCoord([x - 1, y]) ? [x - 1, y] : null),
    right: ([x, y]) => (isValidCoord([x + 1, y]) ? [x + 1, y] : null),
    ["up-left"]: ([x, y]) =>
      isValidCoord([x - 1, y - 1]) ? [x - 1, y - 1] : null,
    ["up-right"]: ([x, y]) =>
      isValidCoord([x + 1, y - 1]) ? [x + 1, y - 1] : null,
    ["down-left"]: ([x, y]) =>
      isValidCoord([x - 1, y + 1]) ? [x - 1, y + 1] : null,
    ["down-right"]: ([x, y]) =>
      isValidCoord([x + 1, y + 1]) ? [x + 1, y + 1] : null,
  };

  const hasSymbol = (coords: [number, number], matrix: string[][]) => {
    const [x, y] = coords;
    const row = matrix[x] ?? [];
    const cell = row[y] ?? null;

    if (!cell) return false;

    const hasMatch = cell.match(SYMBOL_REGEX);

    return (hasMatch ?? []).length > 0;
  };

  const isDigitAdjacentToSymbol = (
    coords: [number, number],
    matrix: string[][]
  ) => {
    const valid_adjacent_coords = (
      Object.keys(ADJACENT_COORDS_MAP) as Direction[]
    ).reduce<[number, number][]>((acc, curr) => {
      const is_valid_coord = ADJACENT_COORDS_MAP[curr](coords);
      if (is_valid_coord) {
        acc.push(is_valid_coord);
      }
      return acc;
    }, []);

    return valid_adjacent_coords.some((adj_coord) =>
      hasSymbol(adj_coord, matrix)
    );
  };

  const getMatrix = (): string[][] => {
    const matrix: string[][] = [];
    inputIterator(input)((line, rowIndex) => {
      const row = line.split("");
      matrix.push([]);

      row.forEach((cell) => {
        matrix[rowIndex].push(cell);
      });
    });

    return matrix;
  };

  const matrix = getMatrix();

  const isDigit = (val: string | undefined) => {
    if (!val) return false;

    return val.match(NUMBER_REGEX);
  };

  const isLastDigitInNumber = (coords: [number, number]): boolean => {
    const [row_index, col_index] = coords;
    const next_value = matrix[row_index][col_index + 1];

    return !isDigit(next_value);
  };

  const hasDigitsInCurrentBaseNumber = (current: BaseNumber) =>
    current.values.length !== 0;

  const getBaseNumbers = (): BaseNumber[] => {
    let base_numbers: BaseNumber[] = [];

    let current_base_number: BaseNumber = { values: [] };

    matrix.forEach((row, row_index) => {
      row.forEach((value, col_index) => {
        if (value.match(NUMBER_REGEX)) {
          const isBuildingBaseNumber =
            hasDigitsInCurrentBaseNumber(current_base_number);

          const isLastDigitInBaseNumber = isLastDigitInNumber([
            row_index,
            col_index,
          ]);

          if (isBuildingBaseNumber) {
            current_base_number.values.push(value);

            if (isLastDigitInBaseNumber) {
              current_base_number.y2 = col_index;

              let tmp = { ...current_base_number };

              base_numbers.push(tmp);

              current_base_number = { values: [] };
            }
          }

          if (!isBuildingBaseNumber) {
            current_base_number.x = row_index;
            current_base_number.y1 = col_index;
            current_base_number.values.push(value);

            if (isLastDigitInBaseNumber) {
              current_base_number.y2 = col_index;

              let tmp = { ...current_base_number };

              base_numbers.push(tmp);

              current_base_number = { values: [] };
            }
          }
        }
      });
    });

    return base_numbers;
  };

  const base_numbers = getBaseNumbers();

  const isValidPartNumber = (base_number_coord_ranges: [number, number][]) =>
    base_number_coord_ranges.some((coords) =>
      isDigitAdjacentToSymbol(coords, matrix)
    );

  const getValidPartNumbers = (base_nums: BaseNumber[]) => {
    return base_nums.reduce<BaseNumber[]>((acc, curr) => {
      const { x, y1, y2 } = curr;

      const all_coords = getCoordRange(x!, y1!, y2!);

      if (isValidPartNumber(all_coords)) {
        acc.push(curr);
      }

      return acc;
    }, []);
  };

  const getStarCoords = (): [number, number][] => {
    return matrix.reduce<[number, number][]>((star_coords, row, row_index) => {
      row.forEach((value, col_index) => {
        if (value === "*") {
          star_coords.push([row_index, col_index]);
        }
      });

      return star_coords;
    }, []);
  };

  // This is much more efficient than my previous solution for checking adjacency
  const isAdjacent = (coord1: [number, number], coord2: [number, number]) => {
    const [x1, y1] = coord1;
    const [x2, y2] = coord2;

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return (
      (dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)
    );
  };

  const getGears = (
    valid_part_numbers: BaseNumber[],
    star_coords: [number, number][]
  ) => {
    const countAdjacentValidPartNumbers = (star_coord: [number, number]) => {
      let adjacent_part_numbers = [];

      for (const valid_part_number of valid_part_numbers) {
        const { x, y1, y2 } = valid_part_number;
        const all_coords = getCoordRange(x!, y1!, y2!);

        for (const coord of all_coords) {
          if (isAdjacent(coord, star_coord)) {
            adjacent_part_numbers.push(
              parseInt(valid_part_number.values.join(""))
            );
            break;
          }
        }

        if (adjacent_part_numbers.length >= 2) {
          break;
        }
      }

      return adjacent_part_numbers;
    };

    const gears: [number, number][] = [];

    for (const star_coord of star_coords) {
      const adjacent_part_numbers = countAdjacentValidPartNumbers(star_coord);

      if (adjacent_part_numbers.length === 2) {
        gears.push(adjacent_part_numbers as [number, number]);
      }
    }

    return gears;
  };

  const valid_part_numbers = getValidPartNumbers(base_numbers);
  const star_coords = getStarCoords();

  const gears = getGears(valid_part_numbers, star_coords);

  const gear_ratios = gears.reduce<number[]>((acc, curr) => {
    const [gear1, gear2] = curr;
    const ratio = gear1 * gear2;
    acc.push(ratio);
    return acc;
  }, []);

  const result = sumGearRatios(gear_ratios);

  return result;
};
