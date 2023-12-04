import * as fs from "fs";

(() => {
  const day = process.argv[2];
  if (!day) {
    console.log("Please provide a day number");
    return;
  }

  const dirName = `day_${day}`;
  const dirPath = `src/${dirName}`;

  // Create the directory
  fs.mkdirSync(dirPath);

  // Create the files
  fs.writeFileSync(
    `${dirPath}/part_1.ts`,
    `
  import { inputIterator } from "../shared/utils";

  export default (input: string) => {
    let result = 0;

    inputIterator(input)((line) => {
        // Code Here 
    });

    console.log('result --->', result);
  }
  `
  );
  fs.writeFileSync(
    `${dirPath}/part_1.test.ts`,
    `
  import { readFileContents } from "../shared/utils";
  import solution from "./part_1";

  describe ("Day ${day} Part 1", () => {
      it('should return the correct value', () => {
          const input = readFileContents(\`./src/${dirName}/test_input_1.txt\`);

          // TODO: Update this with the correct value
          const expected_result = 0;

          expect(solution(input)).toEqual(0);
      });
  })
  `
  );
  fs.writeFileSync(
    `${dirPath}/part_2.ts`,
    `
  import { inputIterator } from "../shared/utils";

  export default (input: string) => {
    let result = 0;

    inputIterator(input)((line) => {
        // Code Here 
    });
    
    console.log('result --->', result);
  }
  `
  );
  fs.writeFileSync(
    `${dirPath}/part_2.test.ts`,
    `
  import { readFileContents } from "../shared/utils";
  import solution from "./part_2";

  describe ("Day ${day} Part 2", () => {
      it('should return the correct value', () => {
          const input = readFileContents(\`./src/${dirName}/test_input_2.txt\`);

          // TODO: Update this with the correct value
          const expected_result = 0;

          expect(solution(input)).toEqual(0);
      });
  })
  `
  );
  fs.writeFileSync(`${dirPath}/test_input_1.txt`, "");
  fs.writeFileSync(`${dirPath}/test_input_2.txt`, "");
})();
