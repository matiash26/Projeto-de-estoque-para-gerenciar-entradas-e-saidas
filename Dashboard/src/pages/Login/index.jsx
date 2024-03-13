import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../services/Api";
//Actions
import { userLogin } from "../../redux/User/Actions";

//Selects
import { selectUser } from "./../../redux/selectors";

//Components
import Input from "../../components/Input";
import AlertLogin from "./../../components/AlertLogin";

//Icons
import { FiUser, FiUnlock } from "react-icons/fi";

import "./style.css";

function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alertLogin, setAlertLogin] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogged } = useSelector(selectUser);

  const handleLogin = async () => {
    setAlertLogin("");
    const { data } = await api.post("/sign-in/", { userName, password });
    if (!isLogged && data.permission) {
      window.localStorage.setItem("token", data.token);
      api.defaults.headers.authorization = `Bearer ${data.token}`;
      dispatch(userLogin(data));
      navigate("/");
      return;
    }
    setAlertLogin(data);
  };
  return (
    <div className="login-container">
      <div className="leftSide">
        <div className="welcomeText">
          <h1>SISTEMA DE ESTOQUE</h1>
        </div>
      </div>
      <main className="form-container">
        <section>
          <h1>ENTRAR</h1>
          {alertLogin && <AlertLogin alert={alertLogin} />}
          <form className="form-login">
            <div>
              <Input
                type="user"
                title="user"
                value={userName}
                onChange={({ target }) => setUserName(target.value)}
                icon={<FiUser />}
              />
            </div>
            <div>
              <Input
                type="password"
                title="senha"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                icon={<FiUnlock />}
              />
            </div>
            <div className="btn-login">
              <button type="button" onClick={() => handleLogin()}>
                ENTRAR
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
export default Login;
