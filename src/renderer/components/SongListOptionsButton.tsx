import { Dispatch, SetStateAction } from 'react';
import { SongOptionModalParams, Song } from 'types';

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

export default SongListOptionsButton;
