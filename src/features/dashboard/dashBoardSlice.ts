import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ICity, IStudent } from 'model';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  rankingList: IStudent[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: IStudent[];
  lowestStudentList: IStudent[];
  rankingByCityList: IStudent[];
  cityList: ICity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
  cityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },
    setCityList(state, action: PayloadAction<ICity[]>) {
      state.cityList = action.payload;
    },
    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<IStudent[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<IStudent[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<IStudent[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

export const dashboardAction = dashboardSlice.actions;

export const selectDashboardLoading = (state: RootState) => state.dashboardReducer.loading;
export const selectStatistics = (state: RootState) => state.dashboardReducer.statistics;
export const selectHighestStudentList = (state: RootState) =>
  state.dashboardReducer.highestStudentList;
export const selectLowestStudentList = (state: RootState) =>
  state.dashboardReducer.lowestStudentList;
export const selectRankingByCityList = (state: RootState) =>
  state.dashboardReducer.rankingByCityList;
  export const selectCityList = (state: RootState) =>
  state.dashboardReducer.cityList;
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
