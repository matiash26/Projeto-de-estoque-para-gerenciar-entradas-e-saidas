import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Selectors
import { selectAlert, selectUser } from "../../redux/selectors";

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import UserList from "../../components/UserList";

import "./style.css";
import { userDelete, userFechList, userSignUp } from "../../redux/User/Actions";

function Users() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { message } = useSelector(selectAlert);
  const { userList } = useSelector(selectUser);

  const clearFields = () => {
    setPassword("");
    setUserName("");
  };

  const signUp = () => {
    dispatch(userSignUp(userName, password));
    clearFields();
  };

  const deleteUser = (id) => {
    dispatch(userDelete(id));
  };
  
  useEffect(() => {
    dispatch(userFechList());
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
            {userList?.map((user) => (
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
