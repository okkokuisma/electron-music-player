/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SongOptionModalParams } from 'types';
import usePlayQueueStore from 'renderer/stores/playQueueStore';

const SongOptionModal = ({
  params,
  handleModalClose,
}: {
  params: SongOptionModalParams;
  handleModalClose: () => void;
}) => {
  const addToQueue = usePlayQueueStore((state) => state.addLastToQueue);
  const playNext = usePlayQueueStore((state) => state.addFirstToQueue);

  const handlePlayNext = () => {
    playNext(params.song);
    handleModalClose();
  };

  const handleAddToQueue = () => {
    addToQueue(params.song);
    handleModalClose();
  };

  const position = {
    top: params.coordinates.y,
    left: params.coordinates.x,
  };

  return (
    <>
      <div className="modal-backdrop" onClick={handleModalClose} />
      <div className="song-option-modal" style={{ ...position }}>
        <button
          className="song-option-modal-button"
          type="button"
          onClick={handlePlayNext}
        >
          Play next
        </button>
        <button
          className="song-option-modal-button"
          type="button"
          onClick={handleAddToQueue}
        >
          Add to queue
        </button>
      </div>
    </>
  );
};

export default SongOptionModal;
