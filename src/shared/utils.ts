import { Day, Part, SolutionCode } from "./types";
import SOLUTION_MAP from "./solution-map";
import fs from "fs";
import path from "path";

const BASE_PATH = __dirname.split("/").slice(0, -2).join("/");

const getAdventPuzzleInput = async (day: number): Promise<string> => {
  try {
    const url = `https://adventofcode.com/2023/day/${day}/input`;
    const response = await fetch(url, {
      headers: {
        Cookie: `session=${process.env.COOKIE}`,
      },
    });
    return response.text();
  } catch (error: any) {
    throw new Error(
      `Failed to get puzzle input for day ${day}. Error: ${error.message}`
    );
  }
};

const getSolutionCode = (day: Day, part: Part): SolutionCode => {
  const solutionCode = SOLUTION_MAP[day]?.[part];

  if (!solutionCode) {
    throw new Error(`No solution code found for day ${day} part ${part}`);
  }

  return solutionCode;
};

export const readFileContents = (filePath: string): string => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return fileContents;
  } catch (error: any) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
};

export const inputIterator = (raw: string, delimiter?: string) => {
  const input = raw.split(delimiter || "\n");

  return (mapper: (line: string, index: number) => void) => {
    input.forEach((line, index) => {
      if (line) {
        mapper(line, index);
      }
    });
  };
};

const hasBulkInputsFile = (day: number) => {
  const filePath = path.join(BASE_PATH, `src/day_${day}/instructions.txt`);
  return fs.existsSync(filePath);
};

export const runAdventPuzzleSolution = async () => {
  const day = parseInt(process.argv[2]);
  const part = parseInt(process.argv[3]);

  if (!day || !part) {
    console.error("Please provide a day and part number");
    return;
  }

  const isTest = !!process.argv[4];

  const solutionCode = getSolutionCode(
    day as unknown as Day,
    part as unknown as Part
  );

  if (isTest) {
    const testInput = readFileContents(
      `./src/day_${day}/test_input_${part}.txt`
    );
    solutionCode(testInput);
    return;
  }

  if (hasBulkInputsFile(day)) {
    const staticInput = readFileContents(`./src/day_${day}/bulk_input.txt`);
    solutionCode(staticInput);
    return;
  }

  const puzzleInput = await getAdventPuzzleInput(day);

  solutionCode(puzzleInput);
};
