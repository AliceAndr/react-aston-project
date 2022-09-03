import { RootState } from './../redux/store';

export const checkLoginMiddleware = (store: any) => (next:any) => (action: any) => {
  let result;
  const currentStore:RootState = store.getState();

  if (action.type === "user/addUser") {
    const sameEmailPrevUsers = Object.values(currentStore.user).find(
      (user) => user.email === action.payload.email
    );

    if (sameEmailPrevUsers) {
      alert("Such user already exists! Try again using different email.");

      return result;
    }
  }

  result = next(action);

  return result;
};
