import {all, fork} from 'redux-saga/effects';
import entertainmentSaga from './entertainmentSaga';

export default function* rootSaga() {
  yield all([fork(entertainmentSaga)]);
}
