import { Mime, AudioFile } from '../../types';

const parseMime = (audioCodec: string | undefined): Mime => {
  switch (audioCodec) {
    case 'MPEG':
      return Mime.Mpeg;
    case 'Ogg':
      return Mime.Ogg;
    default:
      return Mime.Other;
  }
};

export const getTracks = async (): Promise<AudioFile[]> => {
  const tracks = await window.electron.readMusicDir();
  return tracks;
};

export const getAudioSource = async (
  filePath: string,
  fileFormat: string
): Promise<string> => {
  const buffer = await window.electron.getTrackAudio(filePath);
  const audioBlob = new Blob([buffer], { type: parseMime(fileFormat) });
  return window.URL.createObjectURL(audioBlob);
};

const revokeAudioSource = (url: string): void => {
  if (url !== '') {
    window.URL.revokeObjectURL(url);
  }
};

export default { getAudioSource, revokeAudioSource };
