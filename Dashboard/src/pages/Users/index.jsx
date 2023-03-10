import { useCallback, useEffect, useState } from "react"
import Notification from "../../components/Notification"
import UserList from "../../components/UserList"
import Button from "../../components/Button"
import Input from "../../components/Input"
import api from "../../services/Api"
import "./style.css"
function Users() {
    const [listUsers, setListUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    const clearFiuserd = () => {
        setPassword('')
        setUserName('')
    }
    const registerUser = async () => {
        const register = {
            userName: userName,
            password: password
        }
        const { data } = await api.post("/users/register", register)
        setAlert(data)
        clearFiuserd()
    }
    const deleteUser = async (id) => {
        const { data } = await api.delete("/users/delete?id=" + id)
        setAlert(data)
    }
    const fetchUser = useCallback(async () => {
        const { data } = await api.get("/users/list")
        setListUsers(data)
    })
    useEffect(() => fetchUser, [alert])
    return (
        <div className="Container-Main">
            <main className="main-content">
                {alert && <Notification alert={alert} setAlert={setAlert} />}
                <div className="users-container">
                    <h2>Cadastrar usuário</h2>
                    <Input placeholder="Usuario..." type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                    <Input placeholder="Senha..." type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button onClick={registerUser} title="Registrar" className="poolBlue" />
                </div>
                <section className="user-content">
                    <ul>
                        {listUsers.map(user => <UserList key={user.id} userName={user.user} data={user.data} deleteItem={() => deleteUser(user.id)} />)}
                    </ul>
                </section>
            </main>
        </div>
    )
}
export default Users