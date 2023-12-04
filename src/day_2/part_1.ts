import { inputIterator } from "../shared/utils";

type Color = "red" | "green" | "blue";

const MAX_INPUTS: { [key in Color]: number } = {
  blue: 14,
  green: 13,
  red: 12,
};

const getGameId = (line: string) => {
  const regex = /Game (\d+):/;
  const match = line.match(regex);

  return parseInt(match![1]);
};

const getLineSet = (line: string) => {
  const line_set = line.split(":")[1].trim();
  return line_set;
};

const isGamePossible = (line_set: string) => {
  const sets = line_set.split(";");

  return sets.every((set) => {
    const colors = set.trim().split(", ");
    return colors.every((color) => {
      const [count, colorName] = color.split(" ");
      return parseInt(count) <= MAX_INPUTS[colorName as Color];
    });
  });
};

const sumGamePossibilities = (game_possibilities: number[]) =>
  game_possibilities.reduce((acc, curr) => acc + curr, 0);

export default (input: string) => {
  let game_possibilities: number[] = [];

  inputIterator(input)((line) => {
    const line_set = getLineSet(line);

    if (isGamePossible(line_set)) {
      const game_id = getGameId(line);
      game_possibilities.push(game_id);
    }
  });

  const result = sumGamePossibilities(game_possibilities);

  return result;
};
