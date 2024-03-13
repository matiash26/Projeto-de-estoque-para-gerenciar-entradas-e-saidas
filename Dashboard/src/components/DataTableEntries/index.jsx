import { useState } from "react";
import { useDispatch } from "react-redux";

//Actions
import {
  ModalTableEdit,
  modalConfirmToggle,
  modalToggle,
} from "../../redux/modals/actions";
import { fillInFields } from "../../redux/service/action";

//icons
import { FiMoreVertical } from "react-icons/fi";

import "./style.css";

function DataTableEntries({ data }) {
  const [optionModal, setOptionModal] = useState(false);
  const dispatch = useDispatch();

  const handleOptionModal = () => {
    setOptionModal((prev) => !prev);
  };
  const handleEdit = () => {
    dispatch(ModalTableEdit(data));
    dispatch(fillInFields(data));
    dispatch(modalToggle());
    handleOptionModal();
  };
  const handleDelete = () => {
    dispatch(modalConfirmToggle());
    dispatch(ModalTableEdit(data));
    handleOptionModal();
  };
  return (
    <>
      <tr id="tableEntries">
        <td>#{data.id}</td>
        <td>#{data.pedido}</td>
        <td>{data.data}</td>
        <td>{data.produtos}</td>
        <td>R$:{data.total}</td>
        <td className="options-container">
          <FiMoreVertical onClick={handleOptionModal} />
          <ul className={`options-btn ${optionModal ? "active-options" : ""}`}>
            <li onClick={handleEdit}>ver / editar</li>
            <li onClick={handleDelete}>Deletar</li>
          </ul>
        </td>
      </tr>
    </>
  );
}
export default DataTableEntries;
