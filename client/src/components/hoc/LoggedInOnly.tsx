import { Outlet, useNavigate } from "react-router-dom";
import React from "react";

import { useAppSelector } from "../../store/hook";
const loggedInOnly = () => {
  const navigate = useNavigate();
  const NewComponent = () => {
    const user = useAppSelector((state) => state.auth.user);
    if (user) {
      return <Outlet />;
    } else {
      navigate("/login");
    }
  };

  return NewComponent();
};

export default loggedInOnly;
