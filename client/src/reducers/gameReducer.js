import {
  WORD_FETCH,
  WORD_SUCCESS,
  WORD_ERROR,
  TRY_LETTER,
  TRY_SUCCESS,
  TRY_ERROR,
  GAME_LOST,
  GAME_WON
} from "../actions/types";

const initialState = {
  error: null,
  loading: true,
  data: null,
  status: "in progress"
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORD_FETCH:
      return { ...state, loading: true };
    case WORD_ERROR:
      return { ...state, loading: false, error: action.payload };
    case WORD_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case TRY_SUCCESS:
      return { ...state, data: action.payload };
    case GAME_LOST:
      return { ...state, status: "lost" };
    case GAME_WON:
      return { ...state, status: "won" };
    default:
      return state;
  }
};

export default gameReducer;
