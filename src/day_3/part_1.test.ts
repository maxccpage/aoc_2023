import { readFileContents } from "../shared/utils";
import solution from "./part_1";

describe("Day 3 Part 1", () => {
  it("should return the correct value", () => {
    const input = readFileContents(`./src/day_3/test_input_1.txt`);

    const expected_result = 4361;

    expect(solution(input)).toEqual(expected_result);
  });
});
