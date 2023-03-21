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
        const formData = new FormData();
        console.log(picture)
        formData.append('picture', picture?.[0]);
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('newPassword', newPassword);

        const { data } = await api.post("/users/update", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (data.status === "success") {
            setPassword('')
            setNewPassword('')
        }
        setAlert(data)
    }
    return (
        <div className="Container-Main">
            <main className="main-content">
                <section className="profile-content">
                    {alert && <Notification alert={alert} setAlert={setAlert} />}
                    <div className="imageProfile">
                        <img id="imageProfile" src={`http://127.0.0.1:3000/images/${picture}`} alt="Profile Picture" />
                        <label htmlFor="file"><AiOutlineCamera /></label>
                        <input type="file" name="file" id="file" onChange={({ target }) => setPicture(target.files)} />
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