import { inputIterator } from "../shared/utils";

const getIntegerMatches = (line: string): number[] => {
  let integer_matches = [];

  for (let char of line) {
    const parsed_char = parseInt(char);
    if (parsed_char) {
      integer_matches.push(parsed_char);
    }
  }

  return integer_matches;
};

const getConcatonatedDigit = (first: number, last: number): number =>
  parseInt(`${first}${last}`);

export default (input: string) => {
  let result = 0;

  inputIterator(input)((line) => {
    const integer_matches = getIntegerMatches(line);

    const first_match = integer_matches[0];
    const last_match = integer_matches[integer_matches.length - 1];

    const digit = getConcatonatedDigit(first_match, last_match);
    result += digit;
  });

  return result;
};
