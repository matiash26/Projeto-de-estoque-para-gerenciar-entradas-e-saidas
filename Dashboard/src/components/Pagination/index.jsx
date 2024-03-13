import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//Icons
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import "./style.css";

function Pagination({ dataItem, itemTable }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [offset, setOffset] = useState(20);
  const row = dataItem.length;
  const totalPages = Math.ceil(row / 20);
  const dispatch = useDispatch();
  const nextPage = () => {
    if (currentPage < totalPages) {
      setOffset((prev) => prev + 20);
      setStart((prev) => prev + 20);
      setCurrentPage((prev) => (prev += 1));
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setOffset((prev) => (prev -= 20));
      setStart((prev) => (prev -= 20));
      setCurrentPage((prev) => (prev -= 1));
    }
  };
  useEffect(() => {
    if (start) {
      dispatch(itemTable(dataItem.slice(start, offset)));
    }
  }, [dataItem, start]);

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
