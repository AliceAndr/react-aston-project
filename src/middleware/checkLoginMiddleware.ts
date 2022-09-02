// import { RootState } from './../redux/store';

export const checkLoginMiddleware = (store: any) => (next:any) => (action: any) => {
  let result;
  const currentStore = store.getState();

  if (action.type === "user/addNewUser") {
    const sameEmailPrevUsers = Object.values(currentStore.user).find(
      //  @ts-ignore
      (user) => user.email === action.payload.email
    );

    if (sameEmailPrevUsers) {
      alert("Error: there is already such a user");

      return result;
    }
  }

  result = next(action);

  return result;
};
