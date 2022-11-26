// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
// import type { Mime, PlayedTrackInfo } from '../../types';
// import audioFileService from '../services/audioFileService';

// interface PlayedTrackState {
//   audioSource: string;
//   info: PlayedTrackInfo;
// }

// const initialState: PlayedTrackState = {
//   audioSource: '',
//   info: {
//     song: '',
//     artist: '',
//     album: '',
//   },
// };

// export const setAudioSource = createAsyncThunk(
//   'playedTrack/setAudioSourceStatus',
//   async ({ filePath, mime }: { filePath: string; mime: Mime }, _thunkAPI) => {
//     const audioSource = await audioFileService.getAudioSource({
//       filePath,
//       mime,
//     });
//     return audioSource;
//   }
// );

// export const playedTrackSlice = createSlice({
//   name: 'playedTrack',
//   initialState,
//   reducers: {
//     setPlayedTrackInfo: (state, action: PayloadAction<PlayedTrackInfo>) => {
//       state.info = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(setAudioSource.fulfilled, (state, action) => {
//       state.audioSource = action.payload;
//     });
//   },
// });

// export const { setPlayedTrackInfo } = playedTrackSlice.actions;

// export const selectAudioSource = (state: RootState) =>
//   state.playedTrack.audioSource;
// export const selectTrackInfo = (state: RootState) => state.playedTrack.info;

// export default playedTrackSlice.reducer;
