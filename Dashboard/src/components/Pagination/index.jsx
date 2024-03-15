import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

//Icons
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import "./style.css";

function Pagination({ dataItem, addTable }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pag, setPag] = useState({ start: 0, offset: 20 });
  const row = useMemo(() => dataItem.length, [pag.start, dataItem]);
  const totalPages = Math.ceil(row / 20);

  const dispatch = useDispatch();

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPag((prev) => ({
        offset: prev.offset + 20,
        start: prev.start + 20,
      }));
      setCurrentPage((prev) => (prev += 1));
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setPag((prev) => ({
        offset: (prev.offset -= 20),
        start: (prev.start -= 20),
      }));
      setCurrentPage((prev) => (prev -= 1));
    }
  };
  useEffect(() => {
    dispatch(addTable(dataItem.slice(pag.start, pag.offset)));
  }, [pag, dataItem]);
  return (
    <div className="paginationContainer">
      <button className="btnPagination" onClick={prevPage}>
        <FiChevronLeft />
      </button>
      <p>
        {currentPage}
        <span>/</span>
        {totalPages}
      </p>
      <button className="btnPagination" onClick={nextPage}>
        <FiChevronRight />
      </button>
    </div>
  );
}
export default Pagination;
