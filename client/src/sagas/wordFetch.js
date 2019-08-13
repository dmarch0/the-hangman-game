import { put, call, takeEvery } from "redux-saga/effects";

import { WORD_FETCH, WORD_SUCCESS, WORD_ERROR } from "../actions/types";
import axios from "../config/axios";

//watcher saga to fetch words
function* watchFetchWord() {
  yield takeEvery(WORD_FETCH, fetchWordSaga);
}

//worker saga to setup new game
function* fetchWordSaga(action) {
  try {
    const { min, max, token } = action.payload;
    if (token) {
      const response = yield call(axios.get, "/api/words", {
        params: { min, max, token }
      });
      yield put({ type: WORD_SUCCESS, payload: response.data });
    } else {
      const response = yield call(axios.get, "./api/words", {
        params: {
          min,
          max
        }
      });
      yield put({ type: WORD_SUCCESS, payload: response.data });
    }
  } catch (err) {
    if ((err.response.data.error = "User not found")) {
      yield call([localStorage, "removeItem"], "user");
      window.location.reload();
    } else {
      yield put({ type: WORD_ERROR, payload: err.response.data.error });
    }
  }
}

export default watchFetchWord;
