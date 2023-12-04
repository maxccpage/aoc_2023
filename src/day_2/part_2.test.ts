import { readFileContents } from "../shared/utils";
import solution from "./part_2";

describe("Day 2 Part 2", () => {
  it("should return the correct value", () => {
    const input = readFileContents(`./src/day_2/test_input_2.txt`);

    const expected_result = 2286;

    expect(solution(input)).toEqual(expected_result);
  });
});
