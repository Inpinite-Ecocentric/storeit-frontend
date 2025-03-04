import { Route, Routes } from "react-router-dom";

import PurchaseOrderDetailPage from "./pages/PurchaseOrderDetailPage";
import PurchaseOrderList from "./components/PurchaseOrderList";
import WorkerSearchPO from "./pages/WorkerSearchPO";
import LoginPage from "./pages/Login";
import Dashboard from "./assets/Dashboard";
import GlobalLayout from "./pages/layout";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<GlobalLayout />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/purchase-order/:id" element={<PurchaseOrderDetailPage />} />
        <Route path="/purchase-list" element={<PurchaseOrderList />} />
        <Route path="/worker-po" element={<WorkerSearchPO />}  />
      </Route>
    </Routes>
  );
}
