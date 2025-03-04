// src/components/Pagination/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(e.target.value));
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        {startItem}-{endItem} of {totalItems}
      </div>
      <div className="d-flex align-items-center">
        <span className="me-2">Rows per page:</span>
        <select 
          className="form-select form-select-sm me-3" 
          style={{ width: '70px' }}
          value={itemsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value="10">10</option>
        </select>
        
        <div className="btn-group">
          <button 
            className="btn btn-outline-secondary btn-sm" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="btn btn-outline-secondary btn-sm disabled">
            {currentPage}/{totalPages}
          </span>
          <button 
            className="btn btn-outline-secondary btn-sm" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;