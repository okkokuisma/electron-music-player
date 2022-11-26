import { Channels } from 'main/preload';
import { AudioFile } from '../types';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
      readMusicDir: () => Promise<AudioFile[]>;
      getTrackAudio: (filePath: string) => Promise<Buffer>;
    };
  }
}

export {};
