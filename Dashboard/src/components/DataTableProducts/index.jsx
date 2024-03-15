import { useState } from "react";
import { useDispatch } from "react-redux";

//Actions
import { productfillInFields } from "../../redux/product/action";
import {
  ModalTableEdit,
  modalConfirmToggle,
  modalToggle,
} from "../../redux/modals/actions";

//Icons
import { FiMoreVertical } from "react-icons/fi";

import "./style.css";

function DataTableProducts({ data }) {
  const [optionModal, setOptionModal] = useState(false);
  const dispatch = useDispatch();

  const handleOptionModal = () => {
    setOptionModal((prev) => !prev);
  };

  const handleEdit = async () => {
    handleOptionModal();
    dispatch(productfillInFields(data));
    dispatch(ModalTableEdit(data));
    dispatch(modalToggle());
  };

  const handleDelete = () => {
    handleOptionModal();
    dispatch(ModalTableEdit(data));
    dispatch(modalConfirmToggle());
  };
  const status = data.status === "1";
  return (
    <tr>
      <td>#{data.id}</td>
      <td>{data.produto}</td>
      <td>
        <span className={status ? "active" : "disabled"}>
          {status ? "ativo" : "desativado"}
        </span>
      </td>
      <td>R$: {data.valor}</td>
      <td className="options-container">
        <FiMoreVertical onClick={handleOptionModal} />
        <ul className={`options-btn ${optionModal && "active-options"}`}>
          <li onClick={handleEdit}>Editar</li>
          <li onClick={handleDelete}>deletar/desativar</li>
        </ul>
      </td>
    </tr>
  );
}
export default DataTableProducts;
