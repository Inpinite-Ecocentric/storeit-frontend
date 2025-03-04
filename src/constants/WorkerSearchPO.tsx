import { useState } from "react";
import { PurchaseOrderWorker } from "../types/PurchaseTypes";
import { searchPurchaseOrder } from "../services/WorkerMockApi";
import SearchPurchaseOrder from "../components/SearchPurchaseOrder";
import PurchaseOrderDetails from "../components/POpurchaseOrderDetails";

function WorkerSearchPO() {
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderWorker | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleSearch = async (searchTerm: string) => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchPurchaseOrder(searchTerm);
        setPurchaseOrderData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching purchase order data. Please try again.');
        setLoading(false);
        console.error(err);
      }
    };
  
    return (
      <div className="container-fluid py-3">
        <SearchPurchaseOrder onSearch={handleSearch} loading={loading} />
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {purchaseOrderData && <PurchaseOrderDetails purchaseOrder={purchaseOrderData} />}
      </div>
    );
  }
  
  export default WorkerSearchPO;