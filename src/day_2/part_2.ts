import { inputIterator } from "../shared/utils";

type Color = "red" | "green" | "blue";

const getLineSet = (line: string) => {
  const line_set = line.split(":")[1].trim();
  return line_set;
};

const getCubeMinimum = (line_set: string) => {
  const sets = line_set.split(";");
  const mins: { [key in Color]: number } = { red: 0, green: 0, blue: 0 };

  sets.forEach((set) => {
    const colors = set.trim().split(", ");
    colors.forEach((color) => {
      const [count, colorName] = color.split(" ");
      const newCount = parseInt(count);
      const highest = mins[colorName as Color];
      if (newCount > highest) {
        mins[colorName as Color] = newCount;
      }
    });
  });

  return mins;
};

const getPowerOfGame = (mins: { [key in Color]: number }) =>
  Object.values(mins).reduce((acc, curr) => acc * curr, 1);

const sum = (accum_power: number[]) =>
  accum_power.reduce((acc, curr) => acc + curr, 0);

export default (input: string) => {
  let accum_power: number[] = [];

  inputIterator(input)((line) => {
    const line_set = getLineSet(line);

    const minimums = getCubeMinimum(line_set);

    const game_power = getPowerOfGame(minimums);

    accum_power.push(game_power);
  });

  const result = sum(accum_power);

  return result;
};
