import {  PurchaseOrderItemWorker } from "../types/PurchaseTypes";

interface PurchaseOrderItemsListProps {
  items: PurchaseOrderItemWorker[];
  onUpdateQuantity: (id: number, value: number) => void;
  onPrintBarcode: (id: number) => void;
}

const PurchaseOrderItemsList = ({ 
  items, 
  onUpdateQuantity, 
  onPrintBarcode 
}: PurchaseOrderItemsListProps) => {
  return (
    <div className="mt-4">
      <h6 className="mb-3">PO Item List</h6>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-light">
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" className="form-check-input" />
              </th>
              <th style={{ width: '40px' }}>#</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Unit Of Measurement</th>
              <th>Quantity Expected</th>
              <th>Quantity Received</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>{item.id}</td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
                <td>{item.unitOfMeasurement}</td>
                <td>{item.quantityExpected}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantityReceived || ''}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                    min="0"
                    max={item.quantityExpected}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    disabled={!item.canPrintBarcode}
                    onClick={() => onPrintBarcode(item.id)}
                  >
                    Print Barcode
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrderItemsList;