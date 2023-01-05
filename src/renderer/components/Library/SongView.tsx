import { Link } from 'react-router-dom';

import useAudioLibraryStore from 'renderer/stores/audioLibraryStore';
import SongDuration from 'renderer/components/SongDuration';
import CoverPicture from 'renderer/components/CoverPicture';
import { usePlayQueue } from 'renderer/hooks';
import SongTitle from '../SongTitle';

const ArtistName = ({ name }: { name: string | undefined }) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-secondary-info">{name}</div>
    </div>
  );
};

const AlbumName = ({
  name,
  albumHash,
}: {
  name: string | undefined;
  albumHash: number;
}) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-secondary-info">
        <Link to={`/albums/${albumHash}`}>{name}</Link>
      </div>
    </div>
  );
};

const SongView = () => {
  const songs = useAudioLibraryStore((state) =>
    Object.entries(state.songs).map((s) => s[1])
  );

  const { handlePlay } = usePlayQueue();

  return (
    <ul className="song-list">
      {songs.map((song, index) => (
        <li
          key={song.file.filePath}
          id="song-view"
          className="song-list-member"
        >
          {song.file.metadata.songInfo.picture ? (
            <CoverPicture
              width={30}
              file={song.file}
              handlePlay={() => handlePlay(songs, index)}
              picture={song.file.metadata.songInfo.picture[0]}
            />
          ) : (
            <i className="gg-music-note" />
          )}
          <SongTitle
            title={song.file.metadata.songInfo.title}
            handlePlay={() => handlePlay(songs, index)}
          />
          <ArtistName name={song.file.metadata.songInfo.artist} />
          <AlbumName
            name={song.file.metadata.songInfo.album}
            albumHash={song.album}
          />
          <SongDuration duration={song.file.metadata.format.duration} />
        </li>
      ))}
    </ul>
  );
};

export default SongView;
