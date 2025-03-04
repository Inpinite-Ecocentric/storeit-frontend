// src/components/SearchBar/SearchBar.tsx
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onRefresh: () => void;
  initialSearchTerm?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onRefresh, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="d-flex justify-content-end">
      <form onSubmit={handleSubmit} className="d-flex me-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>
      <button className="btn btn-outline-secondary" onClick={onRefresh}>
        <i className="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  );
};

export default SearchBar;