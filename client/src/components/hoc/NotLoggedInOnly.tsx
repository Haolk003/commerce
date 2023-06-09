import { useNavigate, Navigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hook";
type Props = {
  children: React.ReactNode;
};
const LoggedInOnly: React.FC<Props> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};
export default LoggedInOnly;
