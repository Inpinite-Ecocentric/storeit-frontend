// src/components/PurchaseOrderDetail/PurchaseOrderDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {PurchaseOrderDetail as PurchaseOrderDetailType} from '../types/PurchaseTypes';
import { fetchPurchaseOrderById } from '../services/MockApi';
import Breadcrumb from './Breadcrumb';
import '../styles/PurchaseOrderDetail.css'

const PurchaseOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState<PurchaseOrderDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrderDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchPurchaseOrderById(id);
        setOrderDetail(data);
        setError(null);
      } catch (err) {
        setError('Failed to load purchase order details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetail();
  }, [id]);

  const handleBack = () => {
    navigate('/purchase-list');
  };

  if (loading) {
    return (
      <div className="container-fluid purchase-order-detail-container d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !orderDetail) {
    return (
      <div className="container-fluid purchase-order-detail-container">
        <div className="alert alert-danger">
          {error || 'Purchase order not found'}
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleBack}>
              Back to Purchase Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid purchase-order-detail-container">
      <div className="row mb-4">
        <div className="col-12">
          <Breadcrumb
            items={[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Purchase Orders', path: '/purchase-list' },
              { label: `Order ${orderDetail.poNo}` }
            ]}
          />
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Purchase Order Detail</h2>
            <button className="btn btn-outline-secondary" onClick={handleBack}>
              <i className="bi bi-arrow-left"></i> Back to List
            </button>
          </div>
          
          <div className="status-badge bg-success text-white">{orderDetail.status}</div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="detail-card">
            <h5>Order Information</h5>
            <table className="table table-borderless detail-table">
              <tbody>
                <tr>
                  <th>PO ID:</th>
                  <td>{orderDetail.poId}</td>
                </tr>
                <tr>
                  <th>PO No:</th>
                  <td>{orderDetail.poNo}</td>
                </tr>
                <tr>
                  <th>PO Date:</th>
                  <td>{orderDetail.poDate}</td>
                </tr>
                <tr>
                  <th>Delivery Date:</th>
                  <td>{orderDetail.deliveryDate}</td>
                </tr>
                <tr>
                  <th>Payment Terms:</th>
                  <td>{orderDetail.paymentTerms}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-card">
            <h5>Customer Information</h5>
            <table className="table table-borderless detail-table">
              <tbody>
                <tr>
                  <th>Customer Name:</th>
                  <td>{orderDetail.customerName}</td>
                </tr>
                <tr>
                  <th>Billing Address:</th>
                  <td>{orderDetail.billingAddress}</td>
                </tr>
                <tr>
                  <th>Shipping Address:</th>
                  <td>{orderDetail.shippingAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="detail-card">
            <h5>Order Items</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.items.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.unitPrice.toFixed(2)}</td>
                      <td>${item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-end fw-bold">Total Amount:</td>
                    <td className="fw-bold">${orderDetail.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {orderDetail.notes && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="detail-card">
              <h5>Notes</h5>
              <p>{orderDetail.notes}</p>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4 mb-3">
        <div className="col-12 d-flex justify-content-end gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-printer"></i> Print
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-download"></i> Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;