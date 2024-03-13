import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

//Components
import Aside from "../components/Aside";
import Header from "../components/Header";
import Notification from "../components/Notification";

//Selectors
import { selectAlert, selectUser } from "../redux/selectors";

//utils
import { verifyToken } from "./../Utils/verifyToken";

function PrivateRoute() {
  const { message } = useSelector(selectAlert);
  const { isLogged } = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const checkToken = async () => {
    const permission = await verifyToken(dispatch);
    if (permission) navigate(location.pathname);
  };
  useEffect(() => {
    checkToken();
  }, [isLogged]);

  return isLogged ? (
    <>
      <Aside />
      <div className="Container">
        <Header />
        {message && <Notification />}
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
export default PrivateRoute;
