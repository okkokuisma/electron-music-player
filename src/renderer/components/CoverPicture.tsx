import { Song, AudioFile, Picture } from 'types';

interface Props {
  file?: AudioFile;
  picture: Picture;
  handlePlay?: (file: AudioFile) => void;
  width: number;
}

const CoverPicture = ({ file, picture, handlePlay, width }: Props) => {
  const Image = () => {
    return (
      <img
        width={width}
        src={`data:${picture.format};base64,${picture.data}`}
        alt=""
      />
    );
  };

  if (handlePlay && file) {
    return (
      <div className="song-list-member-grid">
        <button type="button" onClick={() => handlePlay(file)}>
          <Image />
        </button>
      </div>
    );
  }

  return (
    <div className="song-list-member-grid">
      <Image />
    </div>
  );
};

export default CoverPicture;
