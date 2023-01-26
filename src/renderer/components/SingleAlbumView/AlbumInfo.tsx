import { Album } from 'types';
import CoverPicture from 'renderer/components/CoverPicture';

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

export default AlbumInfo;
