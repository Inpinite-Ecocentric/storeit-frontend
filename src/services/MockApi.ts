// src/services/api.ts

import { PurchaseOrder, PaginationInfo, PurchaseOrderDetail } from "../types/PurchaseTypes";
import { paginatePurchaseOrders, mockPurchaseOrderDetails } from "./MockData";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPurchaseOrders = async (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ''
): Promise<{ data: PurchaseOrder[], pagination: PaginationInfo }> => {
  try {
    // Simulate network delay
    await delay(800);
    
    // Get paginated data from mock data
    const result = paginatePurchaseOrders(page, limit, searchTerm);
    return result;
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    throw error;
  }
};

export const fetchPurchaseOrderById = async (id: string): Promise<PurchaseOrderDetail> => {
  try {
    // Simulate network delay
    await delay(1000);
    
    const orderId = parseInt(id);
    const orderDetail = mockPurchaseOrderDetails[orderId];
    
    if (!orderDetail) {
      throw new Error('Purchase order not found');
    }
    
    return orderDetail;
  } catch (error) {
    console.error(`Error fetching purchase order with ID ${id}:`, error);
    throw error;
  }
};

export const refreshPurchaseOrders = async (): Promise<{ data: PurchaseOrder[], pagination: PaginationInfo }> => {
  return fetchPurchaseOrders(1, 10, '');
};