import { inputIterator } from "../shared/utils";

export default (input: string) => {
  const separateNumbers = (card: string) => {
    const stripped = card.slice(8); // rmvs card # and colon
    const [raw_winning, raw_nums] = stripped.split("|");

    const format = (str: string): number[] =>
      str
        .split(/\s+/)
        .filter((item) => item !== "")
        .map((num) => parseInt(num));

    const all_numbers = format(raw_nums);

    const winning_numbers = format(raw_winning);

    return [all_numbers, winning_numbers];
  };

  const getWinningNumbersMap = (
    winning_numbers: number[]
  ): Map<number, number> => {
    const winning_numbers_map = new Map();
    winning_numbers.forEach((value, index) => {
      winning_numbers_map.set(value, index);
    });
    return winning_numbers_map;
  };

  const counts: number[] = [];

  inputIterator(input)((line) => {
    const [all_numbers, winning_numbers] = separateNumbers(line);

    const winning_numbers_map = getWinningNumbersMap(winning_numbers);

    let count = 0;

    all_numbers.forEach((num) => {
      if (winning_numbers_map.has(num)) {
        if (count === 0) {
          count = 1;
        } else {
          count = count * 2;
        }
      }
    });

    counts.push(count);
  });

  const result = counts.reduce<number>((acc, curr) => (acc += curr), 0);

  return result;
};
