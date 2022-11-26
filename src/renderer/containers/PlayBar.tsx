/* eslint-disable jsx-a11y/media-has-caption */
import { createRef, useEffect, useRef } from 'react';
import AudioControls from 'renderer/components/AudioControls';
import PlaybackProgressBar from 'renderer/components/PlaybackProgressBar';
import TrackInfo from 'renderer/components/TrackInfo';
import useCurrentSongStore from 'renderer/stores/currentSongStore';
import { parseSecondsToTimeString } from '../utils';

const PlayBar = () => {
  const audioControlRef = createRef<HTMLAudioElement>();
  const duration = useCurrentSongStore(
    (state) => state.currentSong?.metadata.format.duration
  );
  const currentTime = useCurrentSongStore((state) => state.currentTime);
  const metadata = useCurrentSongStore((state) => state.currentSong?.metadata);
  const audioSource = useCurrentSongStore((state) => state.audioSource);
  const playing = useCurrentSongStore((state) => state.playing);
  const setPlaying = useCurrentSongStore((state) => state.setPlaying);
  const setCurrentTime = useCurrentSongStore((state) => state.setCurrentTime);
  const currentTimeRef = useRef(useCurrentSongStore.getState().currentTime);

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

  return (
    <div id="play-bar">
      <PlaybackProgressBar duration={duration} currentTime={currentTime} />
      <audio
        ref={audioControlRef}
        src={audioSource}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={handleCanPlay}
      />
      <AudioControls
        duration={parseSecondsToTimeString(duration)}
        currentTime={parseSecondsToTimeString(currentTime)}
        handlePlayPause={handlePlayPause}
        playing={playing}
      />
      {metadata ? <TrackInfo metadata={metadata} /> : null}
      <div>lol</div>
    </div>
  );
};

export default PlayBar;
