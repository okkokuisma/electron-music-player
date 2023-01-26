/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams } from 'react-router-dom';
import useAudioLibraryStore from 'renderer/stores/audioLibraryStore';
import SongDuration from 'renderer/components/SongDuration';
import SongOptionModal from 'renderer/components/SongOptionModal';
import SongTitle from 'renderer/components/SongTitle';
import { useSongOptionModal, usePlayQueue, useHover } from 'renderer/hooks';
import SongListOptionsButton from 'renderer/components/SongListOptionsButton';
import AlbumInfo from './AlbumInfo';

const IndexNumber = ({ index }: { index: number }) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-secondary-info">{index}</div>
    </div>
  );
};

const SingleAlbumView = () => {
  const { id } = useParams();
  const album = useAudioLibraryStore((state) => state.albums[Number(id)]);
  const artist = useAudioLibraryStore((state) => state.artists[album.artist]);
  const songs = useAudioLibraryStore((state) =>
    album.songs.map((s) => state.songs[s])
  );
  const { modalParams, setModalParams, handleModalClose } =
    useSongOptionModal();
  const { handlePlay } = usePlayQueue();
  const { hover, handleMouseEnter, handleMouseLeave } = useHover();

  if (!album) return null;

  return (
    <div>
      <AlbumInfo
        album={album}
        songs={songs.length}
        handlePlay={() => handlePlay(songs, 0)}
        artist={artist.name}
        year={album.year}
      />
      <ul className="song-list" onMouseLeave={handleMouseLeave}>
        {songs.map((song, index) => (
          <li
            onMouseEnter={() => handleMouseEnter(index)}
            key={song.file.filePath}
            id="single-album-view"
            className="song-list-member"
          >
            <IndexNumber index={index + 1} />
            <SongTitle
              handlePlay={() => handlePlay(songs, index)}
              title={song.file.metadata.songInfo.title}
            />
            {hover === index ? (
              <SongListOptionsButton
                song={song}
                setModalParams={setModalParams}
              />
            ) : (
              <div />
            )}
            <SongDuration duration={song.file.metadata.format.duration} />
          </li>
        ))}
      </ul>
      {modalParams ? (
        <SongOptionModal
          handleModalClose={handleModalClose}
          params={modalParams}
        />
      ) : null}
    </div>
  );
};

export default SingleAlbumView;
