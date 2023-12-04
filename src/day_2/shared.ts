export type Color = "red" | "green" | "blue";

export const getLineSet = (line: string) => {
  const line_set = line.split(":")[1].trim();
  return line_set;
};
