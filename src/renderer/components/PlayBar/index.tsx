/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/media-has-caption */
import { createRef, useEffect, useRef } from 'react';
import AudioControls from 'renderer/components/PlayBar/AudioControls';
import PlaybackProgressBar from 'renderer/components/PlayBar/PlaybackProgressBar';
import TrackInfo from 'renderer/components/PlayBar/TrackInfo';
import useCurrentSongStore from 'renderer/stores/currentSongStore';
import usePlayQueueStore from 'renderer/stores/playQueueStore';
import { parseSecondsToTimeString } from '../../utils';
import repeatIcon from '../../../../assets/repeat.svg';
import shuffleIcon from '../../../../assets/shuffle.svg';

const PlayBar = () => {
  const audioControlRef = createRef<HTMLAudioElement>();
  const duration = useCurrentSongStore(
    (state) => state.currentSong?.file.metadata.format.duration
  );
  const currentTime = useCurrentSongStore((state) => state.currentTime);
  const metadata = useCurrentSongStore(
    (state) => state.currentSong?.file.metadata
  );
  const audioSource = useCurrentSongStore((state) => state.audioSource);
  const playing = useCurrentSongStore((state) => state.playing);
  const setPlaying = useCurrentSongStore((state) => state.setPlaying);
  const setCurrentTime = useCurrentSongStore((state) => state.setCurrentTime);
  const setCurrentSong = useCurrentSongStore((state) => state.setCurrentSong);
  const currentTimeRef = useRef(useCurrentSongStore.getState().currentTime);
  const getNextSong = usePlayQueueStore((state) => state.getNextSong);
  const getPreviousSong = usePlayQueueStore((state) => state.getPreviousSong);
  const toggleRepeat = usePlayQueueStore((state) => state.toggleRepeat);
  const handleShuffle = usePlayQueueStore((state) => state.shuffleQueue);
  const repeatOn = usePlayQueueStore((state) => state.repeatOn);

  useEffect(() => {
    useCurrentSongStore.subscribe((state) => {
      currentTimeRef.current = state.currentTime;
    });
  }, []);

  const handleCanPlay = (): void => {
    audioControlRef.current?.play();
    setPlaying(true);
  };

  const handlePlayPause = (): void => {
    if (audioSource) {
      if (playing) {
        audioControlRef.current?.pause();
      } else {
        audioControlRef.current?.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioControlRef.current?.currentTime) {
      setCurrentTime(audioControlRef.current?.currentTime);
    }
  };

  const handleNextSong = (): void => {
    const next = getNextSong();
    if (next) {
      setCurrentSong(next);
    }
  };

  const handlePreviousSong = (): void => {
    const previous = getPreviousSong();
    if (previous) {
      setCurrentSong(previous);
    }
  };

  const handleEnded = (): void => {
    if (repeatOn) {
      audioControlRef.current?.play();
    } else {
      handleNextSong();
    }
  };

  return (
    <div id="play-bar">
      <PlaybackProgressBar duration={duration} currentTime={currentTime} />
      <audio
        ref={audioControlRef}
        src={audioSource}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
      />
      <AudioControls
        duration={parseSecondsToTimeString(duration)}
        currentTime={parseSecondsToTimeString(currentTime)}
        handlePlayPause={handlePlayPause}
        playing={playing}
        handleNextSong={handleNextSong}
        handlePreviousSong={handlePreviousSong}
      />
      {metadata ? <TrackInfo metadata={metadata} /> : null}
      <div className="playbar-additional-controls">
        <button type="button" onClick={handleShuffle}>
          <svg>
            <use href="../../../../assets/shuffle.svg" />
          </svg>
        </button>
        {/* <img width="20" src={shuffleIcon} alt="" /> */}
        <button type="button" onClick={toggleRepeat}>
          <img width="20" src={repeatIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default PlayBar;
