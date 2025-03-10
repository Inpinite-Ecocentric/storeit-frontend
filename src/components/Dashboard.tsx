// src/pages/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Dashboard</h2>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Recent Purchase Orders</h5>
                  <p className="card-text">You have 5 new purchase orders pending review.</p>
                  <a href="/purchase-list" className="btn btn-primary">View All Orders</a>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Inventory Status</h5>
                  <p className="card-text">3 items are running low on stock.</p>
                  <a href="#" className="btn btn-primary">Check Inventory</a>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">System Updates</h5>
                  <p className="card-text">Last system update: March 01, 2025</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Statistics</h5>
                  <div className="text-center py-4">
                    <p>Order statistics visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Recent Activities</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">New purchase order (#PO-2354) created</li>
                    <li className="list-group-item">Inventory updated for item SKU-8975</li>
                    <li className="list-group-item">Order #PO-2350 marked as delivered</li>
                    <li className="list-group-item">New supplier added to the system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;