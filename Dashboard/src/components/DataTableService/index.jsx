import { useDispatch } from "react-redux";
import { useState } from "react";

//Actions
import { ModalTableEdit } from "./../../redux/modals/actions";
import { fillInFields } from "../../redux/service/action";
import { modalToggle, modalConfirmToggle } from "./../../redux/modals/actions";

//Icons
import { FiMoreVertical } from "react-icons/fi";

import "./style.css";

function DataTableStock({ data }) {
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
    <tr>
      <td>#{data.id}</td>
      <td>{data.servico}</td>
      <td>{data.data}</td>
      <td>R$: {data.gasto}</td>
      <td className="options-container">
        <FiMoreVertical onClick={handleOptionModal} />
        <ul className={`options-btn ${optionModal && "active-options"}`}>
          <li onClick={handleEdit}>Editar</li>
          <li onClick={handleDelete}>Deletar</li>
        </ul>
      </td>
    </tr>
  );
}
export default DataTableStock;
