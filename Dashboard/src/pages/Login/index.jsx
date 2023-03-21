import { useContext, useState } from "react";
import { FiUser, FiUnlock } from "react-icons/fi"
import { AuthContext } from "../../Contexts/AuthContext";
import Notification from "../../components/Notification"
import Input from "../../components/Input";
import api from "../../services/Api";
import "./style.css"

function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const { setIsLogged, setUserName, setPicture } = useContext(AuthContext)

    const handleLogin = async (user, password) => {
        const { data } = await api.post("/sign-in/", {user, password})
        if (data.permission) {
            window.localStorage.setItem("token", data.token)
            api.defaults.headers.authorization = `Bearer ${data.token}`
            setIsLogged(data.permission)
            setUserName(data.userData.userName)
            setPicture(data.userData.picture)
            return
        }
        setAlert(data)

    }

    return (
        <div className="login-container">
            <main className="form-container">
                <section>
                    <h3>Faça Login</h3>
                    <form className="form-login">
                        {alert && <Notification alert={alert} setAlert={setAlert} />}
                        <div>
                            <Input type="user" title="user" value={user} onChange={({ target }) => setUser(target.value)} icon={<FiUser />} />
                        </div>
                        <div>
                            <Input type="password" title="senha" value={password} onChange={({ target }) => setPassword(target.value)} icon={<FiUnlock />} />
                        </div>
                        <div className="btn-login">
                            <button type="button" onClick={() => handleLogin(user, password)}>Login</button>
                        </div>
                    </form>
                </section>
            </main>
            <div className="rightside">
                <div>
                    <h1>BEM VINDO AO SISTEMA</h1>
                </div>
            </div>
        </div>
    )
}
export default Login;