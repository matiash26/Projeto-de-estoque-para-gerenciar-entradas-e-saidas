import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//Actions
import { userUpdate } from "../../redux/User/Actions";

//Selectors
import { selectUser } from "../../redux/selectors";

//Components
import Button from "../../components/Button";
import Input from "../../components/Input";

//Icons
import { AiOutlineCamera } from "react-icons/ai";

import "./style.css";

function Profile() {
  const { user, picture } = useSelector(selectUser);
  const [photo, setPhoto] = useState("");
  const [userName, setUserName] = useState(user);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("picture", photo[0]);
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("newPassword", newPassword);
    dispatch(userUpdate(formData, setPassword, setNewPassword));
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
              onChange={({ target }) => setPhoto(target.files)}
            />
          </div>
          <Input
            placeholder="usuário..."
            onChange={({ target }) => setUserName(target.value)}
            value={userName}
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
