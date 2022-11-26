declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MUSIC_DIR_URL: string;
    }
  }
}

export {};
