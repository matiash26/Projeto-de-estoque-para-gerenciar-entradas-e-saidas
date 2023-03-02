import React from "react";
import Input from "../../components/Input";
import { FiUser, FiUnlock } from "react-icons/fi"
import "./style.css"
function Login() {
    return (
        <div className="login-container">
            <main className="form-container">
                <section>
                    <h3>Faça Login</h3>
                    <form className="form-login">
                        <div>
                            <Input type="email" title="Email" id="email" icon={<FiUser />} />
                        </div>
                        <div>
                            <Input type="password" title="senha" id="password" icon={<FiUnlock />} />
                        </div>
                        <div className="btn-login">
                            <button type="button">Login</button>
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