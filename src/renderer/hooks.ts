import { useState } from 'react';
import { SongOptionModalParams, Song } from 'types';
import usePlayQueueStore from 'renderer/stores/playQueueStore';
import useCurrentSongStore from 'renderer/stores/currentSongStore';

export const useSongOptionModal = () => {
  const [modalParams, setModalParams] = useState<SongOptionModalParams | null>(
    null
  );

  return { modalParams, setModalParams };
};

export const usePlayQueue = () => {
  const setCurrentSong = useCurrentSongStore((state) => state.setCurrentSong);
  const setQueue = usePlayQueueStore((state) => state.setQueue);
  const setIndex = usePlayQueueStore((state) => state.setIndex);
  const getNextSong = usePlayQueueStore((state) => state.getNextSong);

  const handlePlay = (songs: Song[], index: number) => {
    setQueue(songs);
    setIndex(index);
    const next = getNextSong();
    if (next) {
      setCurrentSong(next);
    }
  };

  return { handlePlay, setQueue, setIndex };
};

export default { useSongOptionModal };
