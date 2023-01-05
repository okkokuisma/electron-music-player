import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Song } from '../../types';
import { shuffleArray } from '../utils';

interface PlayQueueState {
  index: number;
  queue: Song[];
  userAdded: Song[];
  repeatOn: boolean;
  getNextSong: () => Song | null;
  getPreviousSong: () => Song | null;
  addFirstToQueue: (song: Song) => void;
  addLastToQueue: (song: Song) => void;
  removeFromQueue: (song: Song) => void;
  setQueue: (songs: Song[]) => void;
  setIndex: (index: number) => void;
  shuffleQueue: () => void;
  toggleRepeat: () => void;
}

const usePlayQueueStore = create<PlayQueueState>()(
  immer((set, get) => ({
    index: 0,
    queue: [],
    userAdded: [],
    repeatOn: false,
    getNextSong: () => {
      if (get().userAdded.length > 0) {
        const nextSong = get().userAdded[0];
        set((state) => {
          state.userAdded = state.userAdded.slice(1);
        });
        return nextSong;
      }

      const currentIndex = get().index;
      if (!get().queue[currentIndex]) {
        set((state) => {
          state.index = 0;
        });
        return get().queue[0];
      }

      set((state) => {
        state.index = currentIndex + 1;
      });
      return get().queue[currentIndex];
    },
    getPreviousSong: () => {
      const currentIndex = get().index;
      if (currentIndex === 0) {
        return get().queue[0];
      }

      const previousSong = get().queue[currentIndex - 1];
      set((state) => {
        state.index = currentIndex - 1;
      });
      return previousSong;
    },
    addFirstToQueue: (song) => {
      set((state) => {
        state.userAdded = [song, ...state.userAdded];
      });
    },
    addLastToQueue: (song) => {
      set((state) => {
        state.userAdded = [...state.userAdded, song];
      });
    },
    removeFromQueue: (song) => {
      set((state) => {
        state.userAdded = state.userAdded.filter(
          (s) => s.album !== song.album && s.artist !== song.artist
        );
      });
    },
    setQueue: (songs) => {
      set((state) => {
        state.queue = songs;
      });
    },
    setIndex: (index) => {
      set((state) => {
        state.index = index;
      });
    },
    shuffleQueue: () => {
      set((state) => {
        state.queue = shuffleArray(state.queue) as Song[];
        state.index = 0;
      });
    },
    toggleRepeat: () => {
      set((state) => {
        state.repeatOn = !state.repeatOn;
      });
    },
  }))
);

export default usePlayQueueStore;
