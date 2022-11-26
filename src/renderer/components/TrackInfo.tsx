import { AudioFileMetaData } from '../../types';

const TrackInfo = ({ metadata }: { metadata: AudioFileMetaData }) => {
  return (
    <div id="TrackInfo">
      <div id="song-pic">
        <img
          width="40"
          src={
            metadata && metadata.songInfo.picture
              ? `data:${metadata.songInfo.picture[0].format};base64,${metadata.songInfo.picture[0].data}`
              : ''
          }
          alt=""
        />
      </div>
      <div id="played-song">
        <span id="song-name">{metadata?.songInfo.title}</span>
        <div>
          <span id="artist-name">{metadata?.songInfo.artist}</span>
          <span id="artist-name"> • {metadata?.songInfo.album}</span>
          <span id="artist-name"> • {metadata?.songInfo.year}</span>
        </div>
      </div>
      <i className="gg-menu" />
    </div>
  );
};

export default TrackInfo;
