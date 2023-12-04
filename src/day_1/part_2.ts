import { inputIterator } from "../shared/utils";

const regex = /(?=(\\d|one|two|three|four|five|six|seven|eight|nine))/g;

type NumberText =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine";

type Match<T = number> = [T, number]; // [match, index]

type IntegerMatch = Match<number>;

type NumberTextMatch = Match<NumberText>;

const number_text_map: { [key in NumberText]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getIntegerMatches = (line: string): IntegerMatch[] => {
  let integer_matches = [];

  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    const parsed_char = parseInt(char);
    const match: IntegerMatch = [parsed_char, index];

    if (parsed_char) {
      integer_matches.push(match);
    }
  }

  return integer_matches;
};

const getNumberTextMatches = (line: string): NumberTextMatch[] => {
  const matches = [...line.matchAll(regex)];

  return matches.map<NumberTextMatch>((match: RegExpMatchArray) => {
    const [_, text] = match as [string, NumberText];
    const index = match.index!;
    const formattedMatch: NumberTextMatch = [text, index];
    return formattedMatch;
  });
};

const getFormattedDigit = (char: number | NumberText) => {
  if (typeof char === "string") {
    return number_text_map[char];
  }

  return char;
};

const getConcatonatedDigit = (
  first: number | NumberText,
  last: number | NumberText
): number => {
  const formatted_first = getFormattedDigit(first);
  const formatted_last = getFormattedDigit(last);

  return parseInt(`${formatted_first}${formatted_last}`);
};

export default (input: string) => {
  let result = 0;

  inputIterator(input)((line) => {
    const number_text_matches = getNumberTextMatches(line);

    const integer_matches = getIntegerMatches(line);

    const all_matches: (NumberTextMatch | IntegerMatch)[] = [
      ...number_text_matches,
      ...integer_matches,
    ].sort((a, b) => a[1] - b[1]);

    const first_match = all_matches[0][0];
    const last_match = all_matches[all_matches.length - 1][0];

    const digit = getConcatonatedDigit(first_match, last_match);
    result += digit;
  });

  return result;
};
