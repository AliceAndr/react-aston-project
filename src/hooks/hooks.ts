import { useState, useEffect } from "react";
import { User } from "../redux/slices/userSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentUser = (): User => {
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

  return {};
}

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
