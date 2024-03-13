import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { userLogOut } from "./../../redux/User/Actions";

//Selectors
import { selectUser } from "./../../redux/selectors";

//Icons
import { FiChevronDown } from "react-icons/fi";

import "./style.css";

function Header() {
  const [userMenu, setUserMenu] = useState(false);

  const dispatch = useDispatch();
  const { picture, user } = useSelector(selectUser);

  const handleBtnUser = () => {
    setUserMenu((prev) => !prev);
  };
  const handleLogOut = () => {
    dispatch(userLogOut());
    window.localStorage.removeItem("token");
  };
  return (
    <header>
      <nav>
        <ul className="user_container">
          <div className="userInfo">
            <img
              src={`http://127.0.0.1:3000/images/${picture}`}
              alt="Profile Picture"
            />
            <span>{user}</span>
          </div>
          <div className="btnUser">
            <FiChevronDown onClick={handleBtnUser} />
            <ul className={`userOptions ${userMenu ? "show" : ""}`}>
              <li onClick={handleBtnUser}>
                <Link to="perfil">Perfil</Link>
              </li>
              <li onClick={handleBtnUser}>
                <Link to="usuarios">Usuários</Link>
              </li>
              <li onClick={handleLogOut} id="exit">
                Sair
              </li>
            </ul>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
