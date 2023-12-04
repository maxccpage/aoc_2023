import part1 from "./part_1";
import { readFileContents } from "../shared/utils";

describe("Day 1 - part 1 ", () => {
  it("should return the correct result", () => {
    const input = readFileContents("src/day_1/test_input_1.txt");

    const expected_result = 142;

    const result = part1(input);

    expect(result).toEqual(expected_result);
  });
});
