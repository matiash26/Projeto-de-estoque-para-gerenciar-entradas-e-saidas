import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../Contexts/AuthContext";
import Header from "../Header"
import Aside from "../Aside"

function PrivateRoute() {
  const { isLogged } = useContext(AuthContext);
  return (
    isLogged ?
      <>
        <Aside />
        <div className="Container">
          <Header />
          <Outlet />
        </div>
      </>
      : <Navigate to="login" />
  )
}
export default PrivateRoute
