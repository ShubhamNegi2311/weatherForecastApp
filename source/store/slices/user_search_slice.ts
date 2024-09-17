import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SearchCityData} from 'data_models/api_data_models';

export type UserSearchHistoryState = {
  userSearchHistoryData: SearchCityData[];
};

const initialState: UserSearchHistoryState = {
  userSearchHistoryData: [],
};

export const userSearchHistorySlice = createSlice({
  name: 'user_search_history_slice',
  initialState,
  reducers: {
    updateUserSearchHistoryList: (
      state,
      action: PayloadAction<SearchCityData[]>,
    ) => {
      state.userSearchHistoryData = action.payload;
    },
  },
});

export const {updateUserSearchHistoryList} = userSearchHistorySlice.actions;

export default userSearchHistorySlice.reducer;
