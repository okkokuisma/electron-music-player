/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import SongView from './SongView';
import AlbumsView from './AlbumsView';

const Library = () => {
  const [view, setView] = useState<string>('albums');

  const handleViewButtonClick = (selectedView: string): void => {
    setView(selectedView);
  };

  const LibraryView = () => {
    if (view === 'albums') {
      return <AlbumsView />;
    }
    if (view === 'songs') {
      return <SongView />;
    }
    return <div>artists</div>;
  };

  return (
    <>
      <div id="library-links">
        <button type="button" onClick={() => handleViewButtonClick('albums')}>
          albums
        </button>
        <button type="button" onClick={() => handleViewButtonClick('songs')}>
          songs
        </button>
        <button type="button" onClick={() => handleViewButtonClick('artists')}>
          artists
        </button>
        <LibraryView />
      </div>
    </>
  );
};

export default Library;
