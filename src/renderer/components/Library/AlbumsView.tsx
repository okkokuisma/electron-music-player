import useAudioLibraryStore from 'renderer/stores/audioLibraryStore';
import { Link } from 'react-router-dom';

const AlbumsView = () => {
  const albums = useAudioLibraryStore((state) => Object.entries(state.albums));

  if (albums.length === 0) return null;

  return (
    <div id="AlbumView">
      {albums.map((album) => (
        <div className="album" key={album[0]}>
          <Link to={`/albums/${album[0]}`}>
            <img
              width="150"
              src={
                album[1].cover
                  ? `data:${album[1].cover.format};base64,${album[1].cover.data}`
                  : ''
              }
              alt=""
            />
          </Link>
          <Link to={`/albums/${album[0]}`}>{album[1].name}</Link>
        </div>
      ))}
    </div>
  );
};

export default AlbumsView;
