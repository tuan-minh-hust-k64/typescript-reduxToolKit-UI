import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import dashboardReducer from 'features/dashboard/dashBoardSlice';
import studentReducer from 'features/student/studentSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authReducer,
    dashboardReducer: dashboardReducer,
    studentReducer: studentReducer
  },
  middleware: (getReducerMiddleware) => {
    return getReducerMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
