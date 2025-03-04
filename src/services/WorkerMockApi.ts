import { PurchaseOrderWorker } from "../types/PurchaseTypes";

// Mock API service
export const searchPurchaseOrder = async (searchTerm: string): Promise<PurchaseOrderWorker> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data for demonstration
      const mockData: PurchaseOrderWorker = {
        poNumber: '1234567',
        purchaseOrderId: 'PO id 12345',
        dateOfCreation: '15/02/2025',
        partyAccountName: 'Party Account Name',
        items: Array(10).fill(0).map((_, index) => ({
          id: index + 1,
          itemCode: 'Item Code',
          itemName: 'Item Name',
          itemDescription: 'Item Description',
          unitOfMeasurement: 'Unit Type',
          quantityExpected: 10,
          quantityReceived: index < 5 ? 10 : 0, // First 5 rows have values
          canPrintBarcode: index < 5 // First 5 rows can print barcode
        }))
      };
      
      resolve(mockData);
    }, 800); // Simulate network delay
  });
};