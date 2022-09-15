import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/hooks";

export const ProtectedRoutes = () => {
  const user = useCurrentUser()?.email;
  return user ? <Outlet /> : <Navigate to='/signin' />
}
