
  import { readFileContents } from "../shared/utils";
  import solution from "./part_2";

  describe ("Day 3 Part 2", () => {
      it('should return the correct value', () => {
          const input = readFileContents(`./src/day_3/test_input_2.txt`);

          // TODO: Update this with the correct value
          const expected_result = 0;

          expect(solution(input)).toEqual(0);
      });
  })
  