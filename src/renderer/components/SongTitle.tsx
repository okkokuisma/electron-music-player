import { Song, AudioFile } from 'types';

const SongTitle = ({
  song,
  handlePlay,
}: {
  song: Song;
  handlePlay: (file: AudioFile) => void;
}) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-main-info">
        <button type="button" onClick={() => handlePlay(song.file)}>
          {song.file.metadata.songInfo.title}
        </button>
      </div>
    </div>
  );
};

export default SongTitle;
