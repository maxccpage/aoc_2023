import day_1_part_1 from "../day_1/part_1";
import day_1_part_2 from "../day_1/part_2";
import day_2_part_1 from "../day_2/part_1";
import day_2_part_2 from "../day_2/part_2";
import day_3_part_1 from "../day_3/part_1";
import day_3_part_2 from "../day_3/part_2";
import day_4_part_1 from "../day_4/part_1";
import day_4_part_2 from "../day_4/part_2";

import { Day, Part, SolutionCode } from "./types";

const SOLUTION_MAP: {
  [key in Day]?: {
    [key in Part]?: SolutionCode;
  };
} = {
  ["1"]: {
    ["1"]: day_1_part_1,
    ["2"]: day_1_part_2,
  },
  ["2"]: {
    ["1"]: day_2_part_1,
    ["2"]: day_2_part_2,
  },
  ["3"]: {
    ["1"]: day_3_part_1,
    ["2"]: day_3_part_2,
  },
  ["4"]: {
    ["1"]: day_4_part_1,
    ["2"]: day_4_part_2,
  },
};

export default SOLUTION_MAP;
