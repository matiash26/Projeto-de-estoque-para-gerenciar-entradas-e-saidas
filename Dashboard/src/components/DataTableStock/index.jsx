import { useState } from "react";
import { useDispatch } from "react-redux";

//Actions
import { stockFillIFields } from "../../redux/stock/action";
import {
  ModalTableEdit,
  modalConfirmToggle,
  modalToggle,
} from "../../redux/modals/actions";

//Icons
import { FiMoreVertical } from "react-icons/fi";

import "./style.css";

function DataTableStock({ data }) {
  const [optionModal, setOptionModal] = useState(false);

  const dispatch = useDispatch();
  const status = data.status === "1" ? true : false;

  const handleOptionModal = () => {
    setOptionModal((prev) => !prev);
  };
  const handleEdit = () => {
    handleOptionModal();
    dispatch(ModalTableEdit(data));
    dispatch(stockFillIFields(data));
    dispatch(modalToggle());
  };
  const handleDelete = () => {
    handleOptionModal();
    dispatch(modalConfirmToggle());
    dispatch(ModalTableEdit(data));
  };
  return (
    <tr>
      <td>#{data.id}</td>
      <td>{data.produto}</td>
      <td>{data.data}</td>
      <td>
        <span className={status ? "active" : "disabled"}>
          {status ? "ativo" : "desativado"}
        </span>
      </td>
      <td>{data.estoque}</td>
      <td>{data.valor}</td>
      <td className="options-container">
        <FiMoreVertical onClick={handleOptionModal} />
        <ul className={`options-btn ${optionModal && "active-options"}`}>
          <li onClick={handleEdit}>Editar</li>
          <li onClick={handleDelete}>Deletar/desativar</li>
        </ul>
      </td>
    </tr>
  );
}
export default DataTableStock;
