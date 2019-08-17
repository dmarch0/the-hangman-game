import { put, takeEvery, call } from "redux-saga/effects";

import { TRY_LETTER, TRY_SUCCESS, GAME_LOST, GAME_WON } from "../actions/types";
import axios from "../config/axios";

function* gameWatcher() {
  yield takeEvery(TRY_LETTER, gameWorker);
}

function* gameWorker(action) {
  const { letter, token, status } = action.payload;

  try {
    const response = yield call(axios.post, "/api/try", {
      letter,
      token,
      user: status
    });
    console.log(response.data);
    if (response.data.error === "User not found") {
      yield call([localStorage, "removeItem"], "user");
      window.location.reload();
    } else if (response.data.status === "in progress") {
      yield put({ type: TRY_SUCCESS, payload: response.data });
    } else if (response.data.status === "won") {
      yield put({ type: GAME_WON, payload: response.data });
    } else if (response.data.status === "lost") {
      yield put({ type: GAME_LOST, payload: response.data });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export default gameWatcher;
