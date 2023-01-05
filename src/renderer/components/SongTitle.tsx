const SongTitle = ({
  title,
  handlePlay,
}: {
  title: string | undefined;
  handlePlay: () => void;
}) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-main-info">
        <button type="button" onClick={() => handlePlay()}>
          {title}
        </button>
      </div>
    </div>
  );
};

export default SongTitle;
