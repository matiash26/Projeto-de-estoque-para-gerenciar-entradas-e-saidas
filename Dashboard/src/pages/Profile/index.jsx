import { AiOutlineCamera } from "react-icons/ai"
import { useContext, useState } from "react"
import { AuthContext } from "../../Contexts/AuthContext"
import Notification from "../../components/Notification"
import Button from "../../components/Button"
import Input from "../../components/Input"
import api from "../../services/Api"
import "./style.css"

function Profile() {
    const [newPassword, setNewPassword] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const { userName, setUserName, setPicture, picture } = useContext(AuthContext)
    const handleUpdate = async () => {
        const Token = window.localStorage.getItem("token")
        if (Token) {
            const update = {
                picture,
                userName,
                password,
                newPassword
            }
            const { data } = await api.put("/users/update", update)
            if (data.status === "success") {
                setAlert(data)
                setPassword('')
                setNewPassword('')
            }
        }
    }
    return (
        <div className="Container-Main">
            <main className="main-content">
                <section className="profile-content">
                    {alert && <Notification alert={alert} setAlert={setAlert} />}
                    <div className="imageProfile" style={{ backgroundImage: (`url(http://127.0.0.1:3000/images/${picture}`) }}>
                        <label htmlFor="file"><AiOutlineCamera /></label>
                        <input type="file" name="file" id="file" onChange={({ target }) => setPicture(target.files[0])} />
                    </div>
                    <Input placeholder="usuário..." onChange={({ target }) => setUserName(target.value)} value={userName} />
                    <Input placeholder="senha atual..." type="password" onChange={({ target }) => setPassword(target.value)} value={password} />
                    <Input placeholder="nova senha..." type="password" onChange={({ target }) => setNewPassword(target.value)} value={newPassword} />
                    <Button title="Atualizar" className="blue" onClick={handleUpdate} />
                </section>
            </main>
        </div>
    )
}
export default Profile