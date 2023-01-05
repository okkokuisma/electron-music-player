import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { getAudioSource } from '../services/audioFileService';
import { Song } from '../../types';

interface PlayedSongState {
  playing: boolean;
  audioSource: string;
  currentSong: Song | null;
  currentTime: number;
  setCurrentSong: (song: Song) => void;
  setCurrentTime: (time: number) => void;
  // setCurrentSong: (track: AudioFile) => void;
  // setAudioSource: (filePath: string, fileFormat: string) => void;
  setPlaying: (isPlaying: boolean) => void;
}

const useCurrentSongStore = create<PlayedSongState>()(
  immer((set) => ({
    playing: false,
    audioSource: '',
    currentSong: null,
    currentTime: 0,
    setCurrentTime: (time) =>
      set((state) => {
        state.currentTime = time;
      }),
    // setCurrentSong: (track) =>
    //   set((state) => {
    //     state.currentSong = track;
    //   }),
    // setAudioSource: async (filePath, fileFormat) => {
    //   const source = await getAudioSource(filePath, fileFormat);
    //   set((state) => {
    //     state.audioSource = source;
    //   });
    // },
    setPlaying: (isPlaying) =>
      set((state) => {
        state.playing = isPlaying;
      }),
    setCurrentSong: async (song) => {
      const source = await getAudioSource(
        song.file.filePath,
        song.file.metadata.format.mime
      );
      set((state) => {
        state.audioSource = source;
        state.currentSong = song;
      });
    },
  }))
);

export default useCurrentSongStore;
