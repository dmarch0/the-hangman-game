import { USER_FETCH } from "./types";

export const createNewUser = (name, won) => ({
  type: USER_FETCH,
  payload: { name, won }
});
