
  import { readFileContents } from "../shared/utils";
  import solution from "./part_2";

  describe ("Day 4 Part 2", () => {
      it('should return the correct value', () => {
          const input = readFileContents(`./src/day_4/test_input_2.txt`);

          // TODO: Update this with the correct value
          const expected_result = 0;

          expect(solution(input)).toEqual(0);
      });
  })
  