import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import PlayBar from './components/PlayBar';
import useAudioLibraryStore from './stores/audioLibraryStore';
import Library from './components/Library';
import SingleAlbumView from './components/SingleAlbumView';

export default function App() {
  const initAudioLibrary = useAudioLibraryStore(
    (state) => state.initAudioLibrary
  );

  useEffect(() => {
    initAudioLibrary();
  }, [initAudioLibrary]);

  return (
    <>
      {/* <TrackList /> */}
      <Router>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/albums/:id" element={<SingleAlbumView />} />
          </Routes>
        </div>
        <PlayBar />
      </Router>
    </>
  );
}
