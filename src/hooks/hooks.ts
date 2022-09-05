import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentUser = () => {
  const users = useAppSelector((state) => state.user);
  let currentUser;

  if (users) {
    currentUser = Object.values(users).find(
      (obj) => obj.isAuth === true
    );
  }

  if (currentUser) {
    return currentUser;
  }

  return;
}
