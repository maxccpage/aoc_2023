
  import { readFileContents } from "../shared/utils";
  import solution from "./part_1";

  describe ("Day 4 Part 1", () => {
      it('should return the correct value', () => {
          const input = readFileContents(`./src/day_4/test_input_1.txt`);

          // TODO: Update this with the correct value
          const expected_result = 0;

          expect(solution(input)).toEqual(0);
      });
  })
  