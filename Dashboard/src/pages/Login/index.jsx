import { FiUser, FiUnlock } from "react-icons/fi"
import { AuthContext } from "../../Contexts/AuthContext";
import { useContext, useState } from "react";
import Input from "../../components/Input";
import api from "../../services/Api"
import "./style.css"
function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { handleLogin } = useContext(AuthContext)

return (
    <div className="login-container">
        <main className="form-container">
            <section>
                <h3>Faça Login</h3>
                <form className="form-login">
                    <div>
                        <Input type="user" title="user" value={userName} onChange={({ target }) => setUserName(target.value)} icon={<FiUser />} />
                    </div>
                    <div>
                        <Input type="password" title="senha" value={password} onChange={({ target }) => setPassword(target.value)} icon={<FiUnlock />} />
                    </div>
                    <div className="btn-login">
                        <button type="button" onClick={()=>handleLogin({userName, password})}>Login</button>
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