/* eslint-disable no-bitwise */
export const parseSecondsToTimeString = (
  secondsFloat: number | undefined
): string => {
  if (!secondsFloat) return '';
  const minutes = Math.floor(secondsFloat / 60);
  const seconds = Math.floor(secondsFloat - minutes * 60);
  // const minutesString = minutes > 10 ? `${minutes}` : `0${minutes}`;
  const secondsString = seconds > 9 ? `${seconds}` : `0${seconds}`;
  return `${minutes}:${secondsString}`;
};

export const hash = (str: string, seed = 0): number => {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i += 1) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const immutableSplice = (
  arr: unknown[],
  start: number,
  deleteCount: number,
  ...items: any
) => {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
};

export const shuffleArray = (array: unknown[]) => {
  const shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
};

export default { parseSecondsToTimeString, hash, immutableSplice };
