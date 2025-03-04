import { useState } from 'react';

interface SearchPurchaseOrderProps {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
}

const SearchPurchaseOrder = ({ onSearch, loading }: SearchPurchaseOrderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center">
        <button className="btn btn-sm" style={{ marginRight: '10px' }}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h5 className="mb-0">Search Purchase Order</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="d-flex justify-content-center">
          <div className="input-group" style={{ maxWidth: '600px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter details for search PO"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-secondary" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPurchaseOrder;