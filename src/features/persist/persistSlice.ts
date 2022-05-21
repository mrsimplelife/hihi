import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ExampleInitialState {
  lastUpdate: number;
  light: boolean;
  count: number;
  exampleData: [];
  error: boolean | null;
}

const exampleInitialState: ExampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  exampleData: [],
  error: null,
};

export const persistSlice = createSlice({
  name: 'persist',
  initialState: exampleInitialState,
  reducers: {
    serverRenderClock(state) {
      state.lastUpdate = Date.now();
      state.light = false;
    },
    startClock(state) {
      state.lastUpdate = Date.now();
      state.light = true;
    },
    incrementCount(state) {
      state.count += 1;
    },
    decrementCount(state) {
      state.count -= 1;
    },
    resetCount(state) {
      state.count = exampleInitialState.count;
    },
    loadExampleData(state, action: PayloadAction<[]>) {
      state.exampleData = action.payload;
    },
    loadingExampleDataFailure(state) {
      state.error = true;
    },
  },
});

export const {
  decrementCount,
  incrementCount,
  loadExampleData,
  loadingExampleDataFailure,
  resetCount,
  serverRenderClock,
  startClock,
} = persistSlice.actions;
