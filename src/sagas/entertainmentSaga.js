import {put, takeLatest} from 'redux-saga/effects';
import {
  FETCHING_ENTERTAINMENT_DATA,
  FETCHING_ENTERTAINMENT_DATA_SUCCESS,
  FETCHING_ENTERTAINMENT_DATA_ERROR,
} from '../action/actionCreators';
import getData from '../services/entertainmentService';

function* fetchEntertainmentData(action) {
  try {
    const data = yield getData(action.payload);
    yield put({type: FETCHING_ENTERTAINMENT_DATA_SUCCESS, data});
  } catch (error) {
    yield put({type: FETCHING_ENTERTAINMENT_DATA_ERROR});
  }
}

function* entertainmentSaga() {
  yield takeLatest(FETCHING_ENTERTAINMENT_DATA, fetchEntertainmentData);
}

export default entertainmentSaga;
