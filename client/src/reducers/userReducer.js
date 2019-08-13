import { USER_SET, USER_ERROR, USER_FETCH, USER_TEMP } from "../actions/types";

const initialState = { token: null, error: null, loading: false, status: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return {
        token: action.payload,
        error: null,
        loading: false,
        status: "logged"
      };
    case USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    case USER_FETCH:
      return { ...state, loading: true };
    case USER_TEMP:
      return { ...state, status: "temp" };
    default:
      return state;
  }
};

export default userReducer;
