import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Song } from '../../types';

interface PlayQueueState {
  queue: Song[];
  getNextSong: () => Song;
  addFirstToQueue: (song: Song) => void;
  addLastToQueue: (song: Song) => void;
  removeFromQueue: (song: Song) => void;
}

const usePlayQueueStore = create<PlayQueueState>()(
  immer((set, get) => ({
    queue: [],
    getNextSong: () => {
      const next = get().queue[0];
      set((state) => {
        state.queue = state.queue.slice(1);
      });
      return next;
    },
    addFirstToQueue: (song) => {
      set((state) => {
        state.queue = [song, ...state.queue];
      });
    },
    addLastToQueue: (song) => {
      set((state) => {
        state.queue = [...state.queue, song];
      });
    },
    removeFromQueue: (song) => {
      set((state) => {
        state.queue = state.queue.filter(
          (s) => s.album !== song.album && s.artist !== song.artist
        );
      });
    },
  }))
);

export default usePlayQueueStore;
