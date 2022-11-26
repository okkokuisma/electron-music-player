import { parseSecondsToTimeString } from 'renderer/utils';

const SongDuration = ({ duration }: { duration: number }) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-secondary-info">
        {parseSecondsToTimeString(duration)}
      </div>
    </div>
  );
};

export default SongDuration;
