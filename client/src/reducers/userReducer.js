import { SET_USER } from "../actions/types";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action) {
    case SET_USER:
      return { token: action.payload };
    default:
      return state;
  }
};

export default userReducer;
