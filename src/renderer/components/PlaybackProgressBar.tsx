const PlaybackProgressBar = ({
  duration,
  currentTime,
}: {
  duration: number | undefined;
  currentTime: number;
}) => {
  const parseProgressPercentage = (): number => {
    if (duration) {
      return (currentTime / duration) * 100;
    }
    return 0;
  };

  return (
    <div
      id="play-progress-bar"
      style={{ width: `${parseProgressPercentage()}%` }}
    />
  );
};

export default PlaybackProgressBar;
