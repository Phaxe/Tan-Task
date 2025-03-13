import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Investment {
  id: number;
  name: string;
  amount: number;
  roi: number;
  date: string;
}

interface TableState {
  data: Investment[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<Investment[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = tableSlice.actions;
export default tableSlice.reducer;