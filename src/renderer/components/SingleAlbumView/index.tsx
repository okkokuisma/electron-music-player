/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams } from 'react-router-dom';
import useAudioLibraryStore from 'renderer/stores/audioLibraryStore';
import SongDuration from 'renderer/components/SongDuration';
import CoverPicture from 'renderer/components/CoverPicture';
import { Dispatch, SetStateAction, useState } from 'react';
import { SongOptionModalParams, Song, Album } from 'types';
import SongOptionModal from 'renderer/components/SongOptionModal';
import SongTitle from 'renderer/components/SongTitle';
import { useSongOptionModal, usePlayQueue } from 'renderer/hooks';

const IndexNumber = ({ index }: { index: number }) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-secondary-info">{index}</div>
    </div>
  );
};

const SongListOptionsButton = ({
  setModalParams,
  song,
}: {
  setModalParams: Dispatch<SetStateAction<SongOptionModalParams | null>>;
  song: Song;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setModalParams({ coordinates: { x: e.pageX, y: e.pageY }, song });
  };

  return (
    <div className="song-list-member-grid">
      <div className="song-list-main-info">
        <button onClick={(e) => handleClick(e)} type="button">
          <i className="gg-more-vertical-alt" />
        </button>
      </div>
    </div>
  );
};

const AlbumInfo = ({
  album,
  handlePlay,
  songs,
  artist,
  year,
}: {
  album: Album;
  handlePlay: (index: number) => void;
  songs: number;
  artist: string;
  year: number | undefined;
}) => {
  return (
    <div className="single-album-info">
      {album.cover ? (
        <CoverPicture width={200} picture={album.cover} />
      ) : (
        <i className="gg-music-note" />
      )}
      <div className="single-album-info-text">
        <span>{album.name}</span>
        <div className="single-album-info-text-inner">
          <p>{`Album • ${artist} • ${year}`}</p>
          <p>{`${songs} songs • 1 hour, 4 minutes`}</p>
        </div>
        <button
          type="button"
          className="single-album-play-button"
          onClick={() => handlePlay(0)}
        >
          <i className="gg-play-button" />
          PLAY
        </button>
      </div>
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
  const [hover, setHover] = useState<number | null>(null);
  const { modalParams, setModalParams } = useSongOptionModal();
  const { handlePlay } = usePlayQueue();

  const handleModalClose = () => {
    if (modalParams) {
      setModalParams(null);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHover(index);
  };

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
      <ul className="song-list" onMouseLeave={() => setHover(null)}>
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
