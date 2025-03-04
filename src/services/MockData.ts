// src/services/mockData.ts

import { PaginationInfo, PurchaseOrder, PurchaseOrderDetail } from "../types/PurchaseTypes";

// Mock data for purchase orders list
export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: 1, poId: 'PO-001', poNo: 'PO20250226-001', poDate: '2025-02-26', customerName: 'Acme Corporation' },
  { id: 2, poId: 'PO-002', poNo: 'PO20250225-002', poDate: '2025-02-25', customerName: 'TechNova Inc.' },
  { id: 3, poId: 'PO-003', poNo: 'PO20250224-003', poDate: '2025-02-24', customerName: 'Global Systems Ltd.' },
  { id: 4, poId: 'PO-004', poNo: 'PO20250223-004', poDate: '2025-02-23', customerName: 'Quantum Solutions' },
  { id: 5, poId: 'PO-005', poNo: 'PO20250222-005', poDate: '2025-02-22', customerName: 'EcoTech Innovations' },
  { id: 6, poId: 'PO-006', poNo: 'PO20250221-006', poDate: '2025-02-21', customerName: 'Strategic Partners LLC' },
  { id: 7, poId: 'PO-007', poNo: 'PO20250220-007', poDate: '2025-02-20', customerName: 'Dynamic Enterprises' },
  { id: 8, poId: 'PO-008', poNo: 'PO20250219-008', poDate: '2025-02-19', customerName: 'Phoenix Industries' },
  { id: 9, poId: 'PO-009', poNo: 'PO20250218-009', poDate: '2025-02-18', customerName: 'Innovative Solutions Co.' },
  { id: 10, poId: 'PO-010', poNo: 'PO20250217-010', poDate: '2025-02-17', customerName: 'Pinnacle Systems' },
  { id: 11, poId: 'PO-011', poNo: 'PO20250216-011', poDate: '2025-02-16', customerName: 'CoreTech Solutions' },
  { id: 12, poId: 'PO-012', poNo: 'PO20250215-012', poDate: '2025-02-15', customerName: 'NextGen Supplies' },
  { id: 13, poId: 'PO-013', poNo: 'PO20250214-013', poDate: '2025-02-14', customerName: 'Fusion Technologies' },
  { id: 14, poId: 'PO-014', poNo: 'PO20250213-014', poDate: '2025-02-13', customerName: 'Prime Manufacturing' },
  { id: 15, poId: 'PO-015', poNo: 'PO20250212-015', poDate: '2025-02-12', customerName: 'Atlas Global Corp' },
  { id: 16, poId: 'PO-016', poNo: 'PO20250211-016', poDate: '2025-02-11', customerName: 'Summit Logistics' },
  { id: 17, poId: 'PO-017', poNo: 'PO20250210-017', poDate: '2025-02-10', customerName: 'Horizon Group' },
  { id: 18, poId: 'PO-018', poNo: 'PO20250209-018', poDate: '2025-02-09', customerName: 'Evergreen Supplies' },
  { id: 19, poId: 'PO-019', poNo: 'PO20250208-019', poDate: '2025-02-08', customerName: 'Vertex Industries' },
  { id: 20, poId: 'PO-020', poNo: 'PO20250207-020', poDate: '2025-02-07', customerName: 'Catalyst Innovations' }
];

// Mock data for purchase order details
export const mockPurchaseOrderDetails: Record<number, PurchaseOrderDetail> = {
  1: {
    id: 1,
    poId: 'PO-001',
    poNo: 'PO20250226-001',
    poDate: '2025-02-26',
    customerName: 'Acme Corporation',
    status: 'Approved',
    shippingAddress: '123 Industrial Way, Business District, New York, NY 10001',
    billingAddress: '123 Industrial Way, Business District, New York, NY 10001',
    paymentTerms: 'Net 30',
    deliveryDate: '2025-03-15',
    totalAmount: 12450.75,
    notes: 'Priority shipment requested. Please ensure delivery before the specified date.',
    items: [
      { id: 101, name: 'Industrial Equipment Model X-1', quantity: 2, unitPrice: 2500.00, totalPrice: 5000.00 },
      { id: 102, name: 'Specialized Tools Set', quantity: 5, unitPrice: 750.25, totalPrice: 3751.25 },
      { id: 103, name: 'Safety Gear Package', quantity: 10, unitPrice: 124.95, totalPrice: 1249.50 },
      { id: 104, name: 'Technical Manual Bundle', quantity: 5, unitPrice: 89.00, totalPrice: 445.00 },
      { id: 105, name: 'Maintenance Kit Premium', quantity: 3, unitPrice: 668.00, totalPrice: 2004.00 }
    ]
  },
  2: {
    id: 2,
    poId: 'PO-002',
    poNo: 'PO20250225-002',
    poDate: '2025-02-25',
    customerName: 'TechNova Inc.',
    status: 'In Progress',
    shippingAddress: '456 Tech Boulevard, Innovation Park, San Francisco, CA 94105',
    billingAddress: '789 Corporate Plaza, Financial District, San Francisco, CA 94111',
    paymentTerms: 'Net 45',
    deliveryDate: '2025-03-30',
    totalAmount: 28750.50,
    notes: 'This order requires specialized handling. Contact IT department before delivery.',
    items: [
      { id: 201, name: 'Enterprise Server System', quantity: 1, unitPrice: 15000.00, totalPrice: 15000.00 },
      { id: 202, name: 'Data Storage Module', quantity: 4, unitPrice: 2500.00, totalPrice: 10000.00 },
      { id: 203, name: 'Network Security Package', quantity: 1, unitPrice: 3000.50, totalPrice: 3000.50 },
      { id: 204, name: 'Technical Support Hours', quantity: 5, unitPrice: 150.00, totalPrice: 750.00 }
    ]
  },
  3: {
    id: 3,
    poId: 'PO-003',
    poNo: 'PO20250224-003',
    poDate: '2025-02-24',
    customerName: 'Global Systems Ltd.',
    status: 'Pending',
    shippingAddress: '555 Global Plaza, Central District, London, UK W1T 7PQ',
    billingAddress: '555 Global Plaza, Central District, London, UK W1T 7PQ',
    paymentTerms: 'Net 60',
    deliveryDate: '2025-04-10',
    totalAmount: 34225.00,
    items: [
      { id: 301, name: 'Telecommunications Equipment', quantity: 2, unitPrice: 8500.00, totalPrice: 17000.00 },
      { id: 302, name: 'Global Tracking System', quantity: 1, unitPrice: 12500.00, totalPrice: 12500.00 },
      { id: 303, name: 'Satellite Communication Module', quantity: 3, unitPrice: 1575.00, totalPrice: 4725.00 }
    ]
  },
  4: {
    id: 4,
    poId: 'PO-004',
    poNo: 'PO20250223-004',
    poDate: '2025-02-23',
    customerName: 'Quantum Solutions',
    status: 'Delivered',
    shippingAddress: '789 Science Park, Research District, Boston, MA 02110',
    billingAddress: '101 Corporate Tower, Financial District, Boston, MA 02108',
    paymentTerms: 'Net 15',
    deliveryDate: '2025-03-05',
    totalAmount: 9850.25,
    items: [
      { id: 401, name: 'Research Equipment Package', quantity: 1, unitPrice: 6750.25, totalPrice: 6750.25 },
      { id: 402, name: 'Laboratory Supplies Set', quantity: 5, unitPrice: 420.00, totalPrice: 2100.00 },
      { id: 403, name: 'Data Analysis Software License', quantity: 2, unitPrice: 500.00, totalPrice: 1000.00 }
    ]
  },
  5: {
    id: 5,
    poId: 'PO-005',
    poNo: 'PO20250222-005',
    poDate: '2025-02-22',
    customerName: 'EcoTech Innovations',
    status: 'Approved',
    shippingAddress: '123 Green Avenue, Eco District, Portland, OR 97201',
    billingAddress: '123 Green Avenue, Eco District, Portland, OR 97201',
    paymentTerms: 'Net 30',
    deliveryDate: '2025-03-20',
    totalAmount: 18795.75,
    notes: 'Carbon-neutral shipping requested.',
    items: [
      { id: 501, name: 'Solar Panel Array', quantity: 1, unitPrice: 12500.75, totalPrice: 12500.75 },
      { id: 502, name: 'Energy Storage Units', quantity: 2, unitPrice: 2750.00, totalPrice: 5500.00 },
      { id: 503, name: 'Monitoring System', quantity: 1, unitPrice: 795.00, totalPrice: 795.00 }
    ]
  }
};

// Function to paginate purchase orders
export const paginatePurchaseOrders = (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ''
): { data: PurchaseOrder[], pagination: PaginationInfo } => {
  // Filter by search term if provided
  let filteredOrders = [...mockPurchaseOrders];
  
  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    filteredOrders = filteredOrders.filter(order => 
      order.poNo.toLowerCase().includes(search) || 
      order.customerName.toLowerCase().includes(search) ||
      order.poId.toLowerCase().includes(search)
    );
  }
  
  // Calculate pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  // Get current page data
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  return {
    data: paginatedOrders,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limit
    }
  };
};