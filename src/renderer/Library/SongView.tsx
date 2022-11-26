import { Link } from 'react-router-dom';

import useAudioLibraryStore from 'renderer/stores/audioLibraryStore';
import SongDuration from 'renderer/components/SongDuration';
import CoverPicture from 'renderer/components/CoverPicture';
import useCurrentSongStore from '../stores/currentSongStore';
import SongTitle from '../components/SongTitle';

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
  const songs = useAudioLibraryStore((state) => Object.entries(state.songs));
  // const setAudioSource = useCurrentSongStore((state) => state.setAudioSource);
  // const setCurrentSong = useCurrentSongStore((state) => state.setCurrentSong);
  const handlePlay = useCurrentSongStore((state) => state.handleSelectSong);

  return (
    <ul className="song-list">
      {songs.map((song) => (
        <li
          key={song[1].file.filePath}
          id="song-view"
          className="song-list-member"
        >
          {song[1].file.metadata.songInfo.picture ? (
            <CoverPicture
              width={30}
              file={song[1].file}
              handlePlay={handlePlay}
              picture={song[1].file.metadata.songInfo.picture[0]}
            />
          ) : (
            <i className="gg-music-note" />
          )}
          <SongTitle song={song[1]} handlePlay={handlePlay} />
          <ArtistName name={song[1].file.metadata.songInfo.artist} />
          <AlbumName
            name={song[1].file.metadata.songInfo.album}
            albumHash={song[1].album}
          />
          <SongDuration duration={song[1].file.metadata.format.duration} />
        </li>
      ))}
    </ul>
  );
};

export default SongView;
