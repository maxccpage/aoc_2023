import { readFileContents } from "../shared/utils";
import solution from "./part_1";

describe("Day 2 Part 1", () => {
  it("should return the correct value", () => {
    const input = readFileContents(`./src/day_2/test_input_1.txt`);

    const expected_result = 8;

    expect(solution(input)).toEqual(expected_result);
  });
});
