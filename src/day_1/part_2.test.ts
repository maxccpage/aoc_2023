import part2 from "./part_2";
import { readFileContents } from "../shared/utils";
describe("Day 1 - part 2 ", () => {
  test("should return the correct result", () => {
    const input = readFileContents("src/day_1/test_input_2.txt");

    const expected_result = 281;

    const result = part2(input);

    expect(result).toEqual(expected_result);
  });
});
