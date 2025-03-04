// src/components/PurchaseOrderDetails.tsx
import { useState, useMemo } from 'react';
import {  PurchaseOrderWorker } from '../types/PurchaseTypes';
import PurchaseOrderItemsList from './POpurchaseOrderItemsList';


interface PurchaseOrderDetailsProps {
  purchaseOrder: PurchaseOrderWorker;
}

const PurchaseOrderDetails = ({ purchaseOrder }: PurchaseOrderDetailsProps) => {
  const [items, setItems] = useState(purchaseOrder.items);

  // Check if any item can print barcode
  const anyCanPrintBarcode = useMemo(() => {
    return items.some(item => item.canPrintBarcode);
  }, [items]);

  const updateQuantityReceived = (id: number, value: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantityReceived: value, canPrintBarcode: value > 0 } 
          : item
      )
    );
  };

  const handleSave = () => {
    // Handle save logic here
    alert('Purchase order saved successfully!');
  };

  const handleCancel = () => {
    // Reset to original data
    setItems(purchaseOrder.items);
  };

  const handlePrintAllBarcodes = () => {
    const activeBarcodes = items.filter(item => item.canPrintBarcode);
    if (activeBarcodes.length === 0) {
      alert('No barcodes available to print');
      return;
    }
    
    alert(`Printing ${activeBarcodes.length} barcodes`);
    console.log('Printing barcodes for items:', activeBarcodes);
  };

  const handlePrintBarcode = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      alert(`Printing barcode for item #${id}: ${item.itemName}`);
      console.log('Printing barcode for item:', item);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <h6 className="text-center mb-4">Search Result</h6>
          <div className="d-flex justify-content-center">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title text-center pb-3 border-bottom">PO No. {purchaseOrder.poNumber}</h5>
                
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Purchase Order Id</label>
                      <p className="text-primary">{purchaseOrder.purchaseOrderId}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Date Of Creation</label>
                      <p>{purchaseOrder.dateOfCreation}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Party Account Name</label>
                      <p className="text-primary">{purchaseOrder.partyAccountName}</p>
                    </div>
                  </div>
                </div>
                
                <PurchaseOrderItemsList 
                  items={items}
                  onUpdateQuantity={updateQuantityReceived}
                  onPrintBarcode={handlePrintBarcode}
                />
                
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button 
                    className="btn btn-warning d-flex align-items-center gap-2" 
                    onClick={handlePrintAllBarcodes}
                    disabled={!anyCanPrintBarcode}
                  >
                    <i className="bi bi-printer"></i> Print All Barcodes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;