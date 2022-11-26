const AudioControls = ({
  handlePlayPause,
  duration,
  playing,
  currentTime,
}: {
  handlePlayPause: () => void;
  duration: string;
  playing: boolean;
  currentTime: string;
}) => {
  return (
    <div id="play-buttons">
      <div className="play-button">
        <i className="gg-play-track-prev" />
      </div>
      <div className="play-button">
        <button type="button" onClick={handlePlayPause}>
          {playing ? (
            <i className="gg-play-pause" />
          ) : (
            <i className="gg-play-button" />
          )}
        </button>
      </div>
      <div className="play-button">
        <i className="gg-play-track-next" />
      </div>
      {duration ? (
        <span id="playtime-text">{`${currentTime} / ${duration}`}</span>
      ) : null}
    </div>
  );
};

export default AudioControls;
