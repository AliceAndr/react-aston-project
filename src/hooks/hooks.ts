import { useState, useEffect } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface IUser {
  [prop: string]: any;
  username?: string,
  email?: string,
  password?: string,
  isAuth?: boolean,
  favorites?: {name:string, url: string}[],
  searchParams?: string[]
}

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
