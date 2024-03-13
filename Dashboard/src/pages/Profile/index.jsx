import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import api from "../../services/Api";

//Actions
import { userLogin } from "../../redux/User/Actions";

//Selectors
import { selectUser } from "../../redux/selectors";

//Components
import Button from "../../components/Button";
import Input from "../../components/Input";

//Icons
import { AiOutlineCamera } from "react-icons/ai";

import "./style.css";

function Profile() {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const { user, picture } = useSelector(selectUser);

  const dispatch = useDispatch();
  //pegar os dados atualizados e mandar para o redux
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("picture", picture?.[0]);
    formData.append("userName", user);
    formData.append("password", password);
    formData.append("newPassword", newPassword);

    try {
      const { data } = await api.post("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status === "success") {
        console.log(data);
        // dispatch(userLogin(data));
        setPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Container-Main">
      <main className="main-content">
        <section className="profile-content">
          <div
            className="imageProfile"
            style={{
              backgroundImage: `url(http://127.0.0.1:3000/images/${picture})`,
            }}
          >
            <label htmlFor="file">
              <AiOutlineCamera />
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={({ target }) => setPicture(target.files)}
            />
          </div>
          <Input
            placeholder="usuário..."
            onChange={({ target }) => setUserName(target.value)}
            value={user}
          />
          <Input
            placeholder="senha atual..."
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <Input
            placeholder="nova senha..."
            type="password"
            onChange={({ target }) => setNewPassword(target.value)}
            value={newPassword}
          />
          <Button title="Atualizar" className="blue" onClick={handleUpdate} />
        </section>
      </main>
    </div>
  );
}
export default Profile;
