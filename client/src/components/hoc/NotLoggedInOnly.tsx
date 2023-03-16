import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hook";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user]);

    return <WrappedComponent />;
  };

  return AuthenticatedComponent;
};
export default withAuth;
