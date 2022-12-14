import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { getTracks } from '../services/audioFileService';
import { AudioFile, Song, Artist, Album } from '../../types';
import { hash } from '../utils';

interface AudioLibrary {
  artists: { [artistId: number]: Artist };
  albums: {
    [albumId: number]: Album;
  };
  songs: {
    [trackId: number]: Song;
  };
}

interface AudioLibraryStoreState extends AudioLibrary {
  audioFiles: AudioFile[];
  initAudioLibrary: () => void;
}

// const reduceMetaData = (audioFiles: AudioFile[]) => {
//   const initialValue: { artists: Set<string>; albums: Set<string> } = {
//     artists: new Set(),
//     albums: new Set(),
//   };

//   return audioFiles.reduce((prev, next) => {
//     const { album, artist } = next.metadata.songInfo;
//     if (album) prev.albums.add(album);
//     if (artist) prev.artists.add(artist);
//     return prev;
//   }, initialValue);
// };

const reduceMeta = (audioFiles: AudioFile[]): AudioLibrary => {
  const initialValue: AudioLibrary = { artists: {}, albums: {}, songs: {} };

  return audioFiles.reduce((library, next) => {
    const album = next.metadata.songInfo.album || 'unknown';
    const artist = next.metadata.songInfo.artist || 'unknown';
    const title = next.metadata.songInfo.title || 'unknown';
    const cover = next.metadata.songInfo.picture;
    const year = next.metadata.songInfo?.year;
    const artistHash = hash(artist);
    const albumHash = hash(album);
    const titleHash = hash(title);

    if (!library.artists[artistHash]) {
      library.artists[artistHash] = { name: artist, albums: [] };
    }

    if (!library.artists[artistHash].albums.includes(albumHash)) {
      library.artists[artistHash].albums.push(albumHash);
    }

    if (!library.albums[albumHash]) {
      const baseAlbum = { name: album, songs: [], artist: artistHash, year };
      library.albums[albumHash] = cover
        ? { ...baseAlbum, cover: cover[0] }
        : baseAlbum;
    }

    if (!library.albums[albumHash].songs.includes(titleHash)) {
      library.albums[albumHash].songs.push(titleHash);
    }

    library.songs[titleHash] = {
      file: next,
      artist: artistHash,
      album: albumHash,
    };
    return library;
  }, initialValue);
};
// const reduceMeta = (audioFiles: AudioFile[]) => {
//   const initialValue: Record<
//     string,
//     Record<string, Record<string, AudioFile>>
//   > = {};

//   return audioFiles.reduce((prev, next) => {
//     const album = next.metadata.songInfo.album || 'unknown';
//     const artist = next.metadata.songInfo.artist || 'unknown';
//     const title = next.metadata.songInfo.title || 'unknown';

//     if (!prev[artist]) prev[artist] = {};
//     if (!prev[artist][album]) prev[artist][album] = {};
//     prev[artist][album][title] = next;
//     return prev;
//   }, initialValue);
// };

const useAudioLibraryStore = create<AudioLibraryStoreState>()(
  immer((set) => ({
    audioFiles: [],
    artists: {},
    albums: {},
    songs: {},
    initAudioLibrary: async () => {
      const audioFiles = await getTracks();
      const reducedMetaData = reduceMeta(audioFiles);
      set((state) => {
        state.audioFiles = audioFiles;
        state.artists = reducedMetaData.artists;
        state.albums = reducedMetaData.albums;
        state.songs = reducedMetaData.songs;
      });
    },
  }))
);

export default useAudioLibraryStore;
