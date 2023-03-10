import { IoTrashBinOutline } from "react-icons/io5"
import "./style.css"
function UserList({ userName, data, deleteItem }) {
    return (
        <li className="listUsers">
            <div>
                <span className="column">Usuário</span>
                <span className="userItem">{userName}</span>
            </div>
            <div>
                <span className="column">Data de criação</span>
                <span className="userItem">{data}</span>
            </div>
            <button className="btn-modal removeUser" onClick={deleteItem}><IoTrashBinOutline /></button>
        </li>
    )
}
export default UserList;
