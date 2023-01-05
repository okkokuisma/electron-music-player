/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { opendir } from 'node:fs/promises';
import { IAudioMetadata } from 'music-metadata';
import { AudioFile } from 'types';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export async function* walkFiles(dir: string): AsyncGenerator<string> {
  // eslint-disable-next-line no-restricted-syntax
  for await (const d of await opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walkFiles(entry);
    else if (d.isFile()) yield entry;
  }
}

const parseMime = (audioCodec: string | undefined): string => {
  switch (audioCodec) {
    case 'MPEG':
      return 'audio/mpeg';
    case 'Ogg':
      return 'audio/ogg';
    default:
      throw new Error('unsupported mime');
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

const isStringArray = (array: unknown[]): array is string[] => {
  let isArray = true;
  array.forEach((value) => {
    if (!isString(value)) isArray = false;
  });
  return isArray;
};

const parseString = (content: unknown): string => {
  if (!content || !isString(content)) {
    throw new Error(`Incorrect or missing metadata value`);
  }
  return content;
};

const parseNumber = (content: unknown): number => {
  if (!content || !isNumber(content)) {
    throw new Error(`Incorrect or missing metadata value`);
  }
  return content;
};

const parseStringArray = (array: unknown[] | undefined): string[] => {
  if (!array || !isStringArray(array)) {
    throw new Error(`Incorrect or missing metadata value`);
  }
  return array;
};

export const parseTrack = (
  data: IAudioMetadata,
  filePath: string
): AudioFile => {
  return {
    metadata: {
      songInfo: {
        artist: parseString(data.common.artist),
        album: parseString(data.common.album),
        title: parseString(data.common.title),
        genre: parseStringArray(data.common.genre),
        picture: data.common.picture?.map((pic) => {
          return { ...pic, data: Buffer.from(pic.data).toString('base64') };
        }),
        year: data.common.year,
        track: data.common.track,
        disk: data.common.disk,
      },
      format: {
        mime: parseMime(data.format.container),
        duration: parseNumber(data.format.duration),
      },
    },
    filePath,
  };
};
