const AudioControls = ({
  handlePlayPause,
  handleNextSong,
  handlePreviousSong,
  duration,
  playing,
  currentTime,
}: {
  handlePlayPause: () => void;
  handleNextSong: () => void;
  handlePreviousSong: () => void;
  duration: string;
  playing: boolean;
  currentTime: string;
}) => {
  return (
    <div id="play-buttons">
      <div className="play-button">
        <button type="button" onClick={handlePreviousSong}>
          <i className="gg-play-track-prev" />
        </button>
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
        <button type="button" onClick={handleNextSong}>
          <i className="gg-play-track-next" />
        </button>
      </div>
      {duration ? (
        <span id="playtime-text">{`${currentTime} / ${duration}`}</span>
      ) : null}
    </div>
  );
};

export default AudioControls;
