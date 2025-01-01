import React, { useEffect, useState } from "react";

export default function Pagination({
  initialPage = 0,
  totalPages,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [totalPages]);

  const renderPageButtons = () => {
    let buttons = [];

    if (totalPages > 6) {
      if (currentPage <= 4) {
        for (let i = 0; i <= 5; i++) {
          const index = i;
          buttons.push(
            <button
              key={index}
              className={`pagination_page-button ${
                currentPage === index ? "active" : ""
              }`}
              onClick={() => handlePageClick(index)}
              aria-current={currentPage === index ? "page" : undefined}
            >
              {index + 1}
            </button>
          );
        }
        buttons.push(<span key="gap-start0">...</span>);
        {
          const index = totalPages;
          buttons.push(
            <button
              key={index}
              className={`pagination_page-button ${
                currentPage === index ? "active" : ""
              }`}
              onClick={() => handlePageClick(index - 1)}
              aria-current={currentPage === index ? "page" : undefined}
            >
              {index}
            </button>
          );
        }
      } else if (currentPage >= totalPages - 5) {
        {
          const index = 0;
          buttons.push(
            <button
              key={index}
              className={`pagination_page-button ${
                currentPage === index ? "active" : ""
              }`}
              onClick={() => handlePageClick(index)}
              aria-current={currentPage === index ? "page" : undefined}
            >
              {index + 1}
            </button>
          );
        }
        buttons.push(<span key="gap-start1">...</span>);
        for (let i = totalPages - 6; i < totalPages; i++) {
          const index = i;
          buttons.push(
            <button
              key={index}
              className={`pagination_page-button ${
                currentPage === index ? "active" : ""
              }`}
              onClick={() => handlePageClick(index)}
              aria-current={currentPage === index ? "page" : undefined}
            >
              {index + 1}
            </button>
          );
        }
      } else {
        buttons.push(
          <button
            key={0}
            className={`pagination_page-button ${
              currentPage === 0 ? "active" : ""
            }`}
            onClick={() => handlePageClick(0)}
            aria-current={currentPage === 0 ? "page" : undefined}
          >
            {1}
          </button>
        );
        buttons.push(<span key="gap-start2">...</span>);
        for (let i = -2; i <= 2; i++) {
          let index = currentPage + i;
          buttons.push(
            <button
              key={index}
              className={`pagination_page-button ${
                currentPage === index ? "active" : ""
              }`}
              onClick={() => handlePageClick(index)}
              aria-current={currentPage === index ? "page" : undefined}
            >
              {index + 1}
            </button>
          );
        }
        buttons.push(<span key="gap-start3">...</span>);
        buttons.push(
          <button
            key={totalPages}
            className={`pagination_page-button ${
              currentPage === totalPages ? "active" : ""
            }`}
            onClick={() => handlePageClick(totalPages - 1)}
            aria-current={currentPage === totalPages ? "page" : undefined}
          >
            {totalPages}
          </button>
        );
      }
    } else if (totalPages > 0) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`pagination_page-button ${
              currentPage === i ? "active" : ""
            }`}
            onClick={() => handlePageClick(i)}
            aria-current={currentPage === i ? "page" : undefined}
          >
            {i + 1}
          </button>
        );
      }
    }

    return buttons;
  };

  if (initialPage > totalPages) {
    throw new Error(
      "Pagination initialPage number must be less than totalPages number. "
    );
  }

  return (
    <div className="pagination">
      <div className="pagination-wrapper">
        <button
          className="pagination_back-button"
          disabled={currentPage === 0}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Назад
        </button>

        {renderPageButtons()}

        <button
          className="pagination_next-button"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
