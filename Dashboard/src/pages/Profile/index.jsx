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
    const [picture, setPicture] = useState('')
    const [alert, setAlert] = useState('')
    const { userName, setUserName } = useContext(AuthContext)

    const handleUpdate = async () => {
        const update = {
            picture,
            user,
            password,
            newPassword
        }
        const { data } = await api.put("/users/update", update)
        setAlert(data)
    }
    return (
        <div className="Container-Main">
            <main className="main-content">
                <section className="profile-content">
                    {alert && <Notification alert={alert} setAlert={setAlert} />}
                    <div className="input-img">
                        <label htmlFor="file"><AiOutlineCamera /></label>
                        <img id="img-profile" src="https://akamai.sscdn.co/uploadfile/letras/fotos/c/4/e/9/c4e987143a79ddc7769d979b49d86456.jpg" alt="profile picture" />
                        <input type="file" name="file" id="file" />
                    </div>
                    <Input placeholder="usuário..." onChange={({ target }) => setUserName(target.value)} value={userName} />
                    <Input placeholder="senha atual..." onChange={({ target }) => setPassword(target.value)} value={password} />
                    <Input placeholder="nova senha..." onChange={({ target }) => setNewPassword(target.value)} value={newPassword} />
                    <Button title="Atualizar" className="blue" onClick={handleUpdate} />
                </section>
            </main>
        </div>
    )
}
export default Profile