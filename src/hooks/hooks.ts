import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentUser = () => {
  const usersFromStore = useAppSelector((state) => state.user);
  let currentUser;

  if (usersFromStore) {
    currentUser = Object.values(usersFromStore).filter(
      //  @ts-ignore
      (obj) => obj.isAuth === true
    )[0];
  }

  if (currentUser) {
    return currentUser;
  }

  return;
}
