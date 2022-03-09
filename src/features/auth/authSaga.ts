import { PayloadAction } from '@reduxjs/toolkit';
import cityAPI from 'api/cityAPI';
import studentAPI from 'api/studentAPI';
import userAPI from 'api/user';
import { dashboardAction } from 'features/dashboard';
import { studentAction } from 'features/student/studentSlice';
import { ICity, IStudent } from 'model';
import { call, fork, put, take } from 'redux-saga/effects';
import { actionAuth, AuthPayload } from './authSlice';

function* login(payload: AuthPayload) {
  try {
    const user = yield call(userAPI.login, payload);
    yield put(
      actionAuth.loginSuccess({
        email: payload.email,
        notifications: user.notifications,
        password: '',
      })
    );
    yield call(initData);
    yield take(actionAuth.logOut.type);
    yield call(logout);
  } catch (err) {
    yield put(actionAuth.loginFailure);
    alert('Something went wrong');
  }
}

function* logout() {
  yield call(userAPI.logout);
}
function* initData() {
  const cityList: ICity[] = yield call(cityAPI.getCity);
  const highestStudentList: IStudent[] = yield call(studentAPI.getHigestMark);
  const lowestStudentList: IStudent[] = yield call(studentAPI.getLowestMark);
  const rankStudentByCity: IStudent[] = yield call(studentAPI.getRankStudentByCity, 'Nam Dinh');
  const listAllStudent: IStudent[] = yield call(studentAPI.getAllStudent, {
    page: 1,
    size: 10,
    sortBy: 'name:asc',
  });
  yield put(studentAction.setListAllStudent(listAllStudent));
  yield put(dashboardAction.setCityList(cityList));
  yield put(dashboardAction.setHighestStudentList(highestStudentList));
  yield put(dashboardAction.setLowestStudentList(lowestStudentList));
  yield put(dashboardAction.setRankingByCityList(rankStudentByCity));
}

function* watchFlowLogin(checkLogin: Boolean, email: string, notifications: any) {
  let isLoggedIn = checkLogin;
  while (true) {
    //@ts-ignore
    if (!isLoggedIn) {
      const action: PayloadAction<AuthPayload> = yield take(actionAuth.login.type);
      yield call(login, action.payload);
    } else {
      yield put(
        actionAuth.loginSuccess({
          email: email,
          notifications,
          password: '',
        })
      );
      yield call(initData);
      yield take(actionAuth.logOut.type);
      yield call(logout);
      isLoggedIn = !isLoggedIn;
    }
  }
}

export default function* authSaga() {
  let checkLogin: Boolean = false;
  let email: string;
  let notifications: any;
  try {
    checkLogin = yield call(userAPI.checkLogin);
    //@ts-ignore
    email = checkLogin.email;
    //@ts-ignore
    notifications = checkLogin.notifications;
    //@ts-ignore
    checkLogin = checkLogin.success;
  } catch (e: any) {
    yield put(actionAuth.logOut);
  }
  yield fork(watchFlowLogin, checkLogin, email, notifications);
}
