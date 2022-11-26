import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { getAudioSource } from '../services/audioFileService';
import { AudioFile } from '../../types';

interface PlayedSongState {
  playing: boolean;
  audioSource: string;
  currentSong: AudioFile | null;
  currentTime: number;
  handleSelectSong: (song: AudioFile) => void;
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
    handleSelectSong: async (song) => {
      const source = await getAudioSource(
        song.filePath,
        song.metadata.format.mime
      );
      set((state) => {
        state.audioSource = source;
        state.currentSong = song;
      });
    },
  }))
);

export default useCurrentSongStore;
