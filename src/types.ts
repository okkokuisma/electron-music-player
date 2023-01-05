import { ICommonTagsResult, IPicture } from 'music-metadata';

export enum Mime {
  Ogg = 'audio/ogg',
  Mpeg = 'audio/mpeg',
  Other = 'invalid',
}

export interface AudioFile {
  filePath: string;
  metadata: AudioFileMetaData;
}

type CommonTagKeys =
  | 'artist'
  | 'title'
  | 'album'
  | 'year'
  | 'genre'
  | 'track'
  | 'disk';

type CommonTags = Pick<ICommonTagsResult, CommonTagKeys> & {
  picture: Picture[] | undefined;
};

export type Picture = Omit<IPicture, 'data'> & { data: string };

// type FormatKeys = 'container' | 'duration' | 'codec' | 'bitrate' | 'sampleRate';

// type Format = Pick<IFormat, FormatKeys> & { mime: string };

interface Format {
  duration: number;
  mime: string;
}

export interface AudioFileMetaData {
  songInfo: CommonTags;
  format: Format;
}

export interface Artist {
  albums: number[];
  name: string;
}

export interface Album {
  songs: number[];
  name: string;
  cover?: Picture;
  artist: number;
  year?: number;
}

export interface Song {
  file: AudioFile;
  artist: number;
  album: number;
}

export interface SongOptionModalParams {
  coordinates: ModalCoordinates;
  song: Song;
}

interface ModalCoordinates {
  x: number;
  y: number;
}
