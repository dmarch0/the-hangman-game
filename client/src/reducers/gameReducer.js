import { WORD_FETCH, WORD_SUCCESS, WORD_ERROR } from "../actions/types";

const initialState = { error: null, loading: false, data: null };

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORD_FETCH:
      return { ...state, loading: true };
    case WORD_ERROR:
      return { ...state, loading: false, error: action.payload };
    case WORD_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
