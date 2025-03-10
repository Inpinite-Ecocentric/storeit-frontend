// src/components/PurchaseOrderList/PurchaseOrderList.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { fetchPurchaseOrders } from '../services/MockApi';
import { PurchaseOrder, PaginationInfo } from '../types/PurchaseTypes';
import Pagination from './Pagination';
import SearchBar from './Searchbar';
import Breadcrumb from './Breadcrumb';
import "../styles/PurchaseOderList.css";

const PurchaseOrderList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse query parameters or use localStorage to get pagination state
  const getInitialState = () => {
    // Check URL parameters first
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    const limitParam = params.get('limit');
    const searchParam = params.get('search') || '';
    
    // If URL parameters exist, use them
    if (pageParam) {
      return {
        currentPage: parseInt(pageParam) || 1,
        itemsPerPage: parseInt(limitParam) || 10,
        searchTerm: searchParam
      };
    }
    
    // Otherwise check localStorage
    try {
      const savedState = localStorage.getItem('purchaseOrderListState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          currentPage: parsedState.currentPage || 1,
          itemsPerPage: parsedState.itemsPerPage || 10,
          searchTerm: parsedState.searchTerm || ''
        };
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e);
    }
    
    // Default values if nothing is found
    return {
      currentPage: 1,
      itemsPerPage: 10,
      searchTerm: ''
    };
  };
  
  const initialState = getInitialState();
  const [searchTerm, setSearchTerm] = useState<string>(initialState.searchTerm);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: initialState.currentPage,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: initialState.itemsPerPage
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Save state function
  const saveState = (page: number, itemsPerPage: number, searchTerm: string) => {
    // Update URL parameters
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', itemsPerPage.toString());
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    // Update URL without reloading the page
    navigate(`?${params.toString()}`, { replace: true });
    
    // Also save to localStorage as backup
    try {
      localStorage.setItem('purchaseOrderListState', JSON.stringify({
        currentPage: page,
        itemsPerPage,
        searchTerm
      }));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const loadPurchaseOrders = async (
    page: number = pagination.currentPage, 
    itemsPerPage: number = pagination.itemsPerPage,
    newSearchTerm: string = searchTerm
  ) => {
    try {
      setLoading(true);
      const response = await fetchPurchaseOrders(page, itemsPerPage, newSearchTerm);
      setPurchaseOrders(response.data);
      setPagination({
        currentPage: page,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
        itemsPerPage: itemsPerPage
      });
      
      // Save current state
      saveState(page, itemsPerPage, newSearchTerm);
      
      setError(null);
    } catch (err) {
      setError('Failed to load purchase orders. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchaseOrders(initialState.currentPage, initialState.itemsPerPage, initialState.searchTerm);
  }, []);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    loadPurchaseOrders(1, pagination.itemsPerPage, newSearchTerm); // Search always goes to page 1
  };

  const handleRefresh = async () => {
    loadPurchaseOrders(pagination.currentPage, pagination.itemsPerPage, searchTerm);
  };

  const handlePageChange = (page: number) => {
    loadPurchaseOrders(page, pagination.itemsPerPage, searchTerm);
  };

  const handleRowsPerPageChange = (newItemsPerPage: number) => {
    // When changing items per page, always go back to first page
    loadPurchaseOrders(1, newItemsPerPage, searchTerm);
  };

  const handleRowClick = (orderId: number) => {
    navigate(`/purchase-order/${orderId}`);
  };

  return (
    <div className="container-fluid purchase-order-container">
      <div className="row mb-3">
        <div className="col-12">
          <Breadcrumb
            items={[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Purchase Orders' }
            ]}
          />
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <h3>Purchase Order Listing</h3>
        </div>
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} onRefresh={handleRefresh} initialSearchTerm={searchTerm} />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover border">
          <thead className="bg-light">
            <tr>
              <th>
                <input type="checkbox" className="form-check-input" />
              </th>
              <th>#</th>
              <th>PO ID</th>
              <th>PO No.</th>
              <th>PO Date</th>
              <th>Customer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : purchaseOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No purchase orders found
                </td>
              </tr>
            ) : (
              purchaseOrders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className="cursor-pointer"
                  onClick={() => handleRowClick(order.id)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td>{(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1}</td>
                  <td>{order.poId}</td>
                  <td>{order.poNo}</td>
                  <td>{order.poDate}</td>
                  <td>{order.customerName}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Link to={`/purchase-order/${order.id}`} className="btn btn-sm btn-link view-btn">
                      <i className="bi bi-eye"></i> View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default PurchaseOrderList;