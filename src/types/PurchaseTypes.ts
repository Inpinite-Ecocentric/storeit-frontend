// src/types/types.ts
export interface PurchaseOrder {
    id: number;
    poId: string;
    poNo: string;
    poDate: string;
    customerName: string;
  }
  
  export interface PurchaseOrderDetail extends PurchaseOrder {
    items: PurchaseOrderItem[];
    totalAmount: number;
    status: string;
    shippingAddress: string;
    billingAddress: string;
    paymentTerms: string;
    deliveryDate: string;
    notes?: string;
  }
  
  export interface PurchaseOrderItem {
    id: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }

  export interface PurchaseOrderItemWorker {
    id: number;
    itemCode: string;
    itemName: string;
    itemDescription: string;
    unitOfMeasurement: string;
    quantityExpected: number;
    quantityReceived: number;
    canPrintBarcode: boolean;
  }

  export interface PurchaseOrderWorker {
    poNumber: string;
    purchaseOrderId: string;
    dateOfCreation: string;
    partyAccountName: string;
    items: PurchaseOrderItemWorker[];
  }