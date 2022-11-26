/* eslint-disable global-require */
import path from 'path';
import { opendir, readFile } from 'node:fs/promises';
import { IAudioMetadata, parseFile } from 'music-metadata';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  IpcMainInvokeEvent,
} from 'electron';
// import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { AudioFile } from '../types';

import { MUSIC_DIR_URL } from '../config';

console.log(MUSIC_DIR_URL);

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

async function* walk(dir: string): AsyncGenerator<string> {
  // eslint-disable-next-line no-restricted-syntax
  for await (const d of await opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

const parseMime = (audioCodec: string | undefined): string => {
  switch (audioCodec) {
    case 'MPEG':
      return 'audio/mpeg';
    case 'Ogg':
      return 'audio/ogg';
    default:
      throw new Error('unsupported mime');
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

const isStringArray = (array: unknown[]): array is string[] => {
  let isArray = true;
  array.forEach((value) => {
    if (!isString(value)) isArray = false;
  });
  return isArray;
};

const parseString = (content: unknown): string => {
  if (!content || !isString(content)) {
    throw new Error(`Incorrect or missing metadata value`);
  }
  return content;
};

const parseNumber = (content: unknown): number => {
  if (!content || !isNumber(content)) {
    throw new Error(`Incorrect or missing metadata value`);
  }
  return content;
};

const parseStringArray = (array: unknown[] | undefined): string[] => {
  if (!array || !isStringArray(array)) {
    throw new Error(`Incorrect or missing metadata value`);
  }
  return array;
};

const parseTrack = (data: IAudioMetadata, filePath: string): AudioFile => {
  return {
    metadata: {
      songInfo: {
        artist: parseString(data.common.artist),
        album: parseString(data.common.album),
        title: parseString(data.common.title),
        genre: parseStringArray(data.common.genre),
        picture: data.common.picture?.map((pic) => {
          return { ...pic, data: Buffer.from(pic.data).toString('base64') };
        }),
        year: data.common.year,
        track: data.common.track,
        disk: data.common.disk,
      },
      format: {
        mime: parseMime(data.format.container),
        duration: parseNumber(data.format.duration),
      },
    },
    filePath,
  };
};

const handleMusicDirRead = async (): Promise<AudioFile[]> => {
  try {
    const fileMeta: AudioFile[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const filePath of walk(MUSIC_DIR_URL)) {
      if (['.mp3', '.ogg'].includes(path.extname(filePath))) {
        const metadata = await parseFile(filePath);
        try {
          const parsedTrack = parseTrack(metadata, filePath);
          fileMeta.push(parsedTrack);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    }
    return fileMeta;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const handleGetTrackAudio = async (
  filePath: string
): Promise<Buffer | null> => {
  try {
    return await readFile(filePath);
  } catch (error) {
    console.log(error);
    return null;
  }
};

app
  .whenReady()
  .then(() => {
    ipcMain.handle('read-music-dir', handleMusicDirRead);
    ipcMain.handle(
      'get-track-audio',
      (_event: IpcMainInvokeEvent, [filePath]) => handleGetTrackAudio(filePath)
    );
    createWindow();
    return app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
