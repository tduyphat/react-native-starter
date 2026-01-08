import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../services/api-service';

interface Photo {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  priceUnit: string;
}

interface ApiState {
  data: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchApiData = createAsyncThunk<
  Photo[],
  string,
  { rejectValue: string }
>('api/fetchApiData', async (token, { rejectWithValue }) => {
  try {
    const response = await apiService.fetchData(token);
    const list = response.data.data as Photo[];
    return list;
  } catch (err: any) {
    const message =
      err?.response?.data?.error?.message ?? err?.message ?? 'Unknown error';
    return rejectWithValue(message);
  }
});

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApiData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApiData.fulfilled,
        (state, action: PayloadAction<Photo[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Request failed';
      });
  },
});

export const selectApiData = (state: { api: ApiState }) => state.api.data;
export const selectApiLoading = (state: { api: ApiState }) => state.api.loading;
export const selectApiError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;
