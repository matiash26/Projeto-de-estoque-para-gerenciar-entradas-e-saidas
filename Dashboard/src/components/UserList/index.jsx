import { IoTrashBinOutline } from "react-icons/io5";
import "./style.css";
function UserList({ data, deleteItem }) {
  return (
    <li className="listUsers">
      <div>
        <span className="column">Usuário</span>
        <span className="userItem">{data.user}</span>
      </div>
      <div>
        <span className="column">Data de criação</span>
        <span className="userItem">{data.data}</span>
      </div>
      <button className="btn-modal removeUser" onClick={deleteItem}>
        <IoTrashBinOutline />
      </button>
    </li>
  );
}
export default UserList;
