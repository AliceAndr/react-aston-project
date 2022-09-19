import { RootState } from './../redux/store';
import { Middleware } from "redux";

export const checkLoginMiddleware: Middleware = (store) => (next) => (action) => {
  let result;
  const currentStore: RootState = store.getState();

  if (action.type === "user/addUser") {
    const emailUsed = Object.values(currentStore.user).find(
      (user) => user.email === action.payload.email
    );

    if (emailUsed) {
      alert("Such user already exists! Please, try again using different email.");

      return result;
    }
  }

  result = next(action);

  return result;
};
