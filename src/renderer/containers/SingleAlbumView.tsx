import { useParams } from 'react-router-dom';
import useAudioLibraryStore from 'renderer/stores/audioLibraryStore';
import SongDuration from 'renderer/components/SongDuration';
import CoverPicture from 'renderer/components/CoverPicture';
import useCurrentSongStore from 'renderer/stores/currentSongStore';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import SongTitle from '../components/SongTitle';
import { Song } from '../../types';

interface ModalCoordinates {
  x: number;
  y: number;
}

const IndexNumber = ({ index }: { index: number }) => {
  return (
    <div className="song-list-member-grid">
      <div className="song-list-secondary-info">{index}</div>
    </div>
  );
};

// const SongElement = ({ index, song }: { index: number; song: Song }) => {
//   const handlePlay = useCurrentSongStore((state) => state.handleSelectSong);
//   const [hover, setHover] = useState<boolean>(false);

//   const handleMouseHover = () => {
//     setHover(true);
//   };

//   const handleMouseLeave = () => {
//     setHover(false);
//   };

//   return (
//     <li
//       onMouseEnter={handleMouseHover}
//       onMouseLeave={handleMouseLeave}
//       id="single-album-view"
//       className="song-list-member"
//     >
//       <IndexNumber index={index + 1} />
//       <SongTitle handlePlay={handlePlay} song={song} />
//       {hover ? <i className="gg-more-vertical-alt" /> : <div />}
//       <SongDuration duration={song.file.metadata.format.duration} />
//     </li>
//   );
// };

const SongListOptionsButton = ({
  setOptionModalOpen,
}: {
  setOptionModalOpen: Dispatch<SetStateAction<ModalCoordinates | null>>;
}) => {
  // const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOptionModalOpen({ x: e.pageX, y: e.pageY });
  };

  return (
    <div className="song-list-options-button">
      <button onClick={(e) => handleClick(e)} type="button">
        <i className="gg-more-vertical-alt" />
      </button>
    </div>
  );
};

const SingleAlbumView = () => {
  const { id } = useParams();
  const album = useAudioLibraryStore((state) => state.albums[Number(id)]);
  const songs = useAudioLibraryStore((state) =>
    album.songs.map((s) => state.songs[s])
  );
  const handlePlay = useCurrentSongStore((state) => state.handleSelectSong);
  const [hover, setHover] = useState<number | null>(null);
  const [optionModalOpen, setOptionModalOpen] =
    useState<ModalCoordinates | null>(null);

  const handleMouseEnter = (index: number) => {
    setHover(index);
  };

  if (!album) return null;

  return (
    <>
      <div className="single-album-info">
        {album.cover ? (
          <CoverPicture width={200} picture={album.cover} />
        ) : (
          <i className="gg-music-note" />
        )}
        <div className="single-album-info-text">
          <span>{album.name}</span>
          <div className="single-album-info-text-inner">
            <p>Album • Artist • 2018</p>
            <p>12 songs • 1 hour, 4 minutes</p>
          </div>
          <button type="button" className="single-album-play-button">
            <i className="gg-play-button" />
            <span>PLAY</span>
          </button>
        </div>
      </div>
      <ul className="song-list" onMouseLeave={() => setHover(null)}>
        {songs.map((song, index) => (
          // <SongElement song={song} index={index} key={song.file.filePath} />
          <li
            // onMouseOver={() => console.log(`over${index}`)}
            // onFocus={() => handleMouseHover(index)}
            // onMouseLeave={() => console.log(`leave${index}`)}
            onMouseEnter={() => handleMouseEnter(index)}
            // onFocus={() => handleMouseHover(index)}
            // onMouseOut={() => handleMouseLeave(index)}
            // onBlur={() => handleMouseLeave(index)}
            key={song.file.filePath}
            id="single-album-view"
            className="song-list-member"
          >
            <IndexNumber index={index + 1} />
            <SongTitle handlePlay={handlePlay} song={song} />
            {hover === index ? (
              <SongListOptionsButton setOptionModalOpen={setOptionModalOpen} />
            ) : (
              <div />
            )}
            <SongDuration duration={song.file.metadata.format.duration} />
          </li>
        ))}
      </ul>
      {optionModalOpen ? (
        <div
          style={{
            position: 'absolute',
            top: optionModalOpen.y,
            left: optionModalOpen.x,
            background: 'blue',
            height: '200px',
            width: '100px',
          }}
        />
      ) : null}
    </>
  );
};

export default SingleAlbumView;
