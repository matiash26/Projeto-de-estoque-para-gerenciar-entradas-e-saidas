import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";

//Selectors
import { selectAlert } from "../../redux/selectors";

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import UserList from "../../components/UserList";

import "./style.css";

function Users() {
  const [listUsers, setListUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { message } = useSelector(selectAlert);

  const clearFields = () => {
    setPassword("");
    setUserName("");
  };
  
  const signUp = async () => {
    const { data } = await api.post("/sign-up", { userName, password });
    dispatch(AlertAdd(data));
    clearFields();
  };

  const deleteUser = async (id) => {
    const { data } = await api.delete("/users/delete?id=" + id);
    dispatch(AlertAdd(data));
  };

  const fetchUser = useCallback(async () => {
    const { data } = await api.get("/users/list");
    setListUsers(data);
  });

  useEffect(() => {
    fetchUser();
  }, [message]);

  return (
    <div className="Container-Main">
      <main className="main-content">
        <div className="users-container">
          <h2>Cadastrar usuário</h2>
          <Input
            placeholder="Usuario..."
            type="text"
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
          <Input
            placeholder="Senha..."
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button onClick={signUp} title="Registrar" className="poolBlue" />
        </div>
        <section className="user-content">
          <ul>
            {listUsers.map((user) => (
              <UserList
                key={user.id}
                data={user}
                deleteItem={() => deleteUser(user.id)}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
export default Users;
