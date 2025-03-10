// import { Route, Routes } from "react-router-dom";

// import PurchaseOrderDetailPage from "./pages/PurchaseOrderDetailPage";
// import PurchaseOrderList from "./components/PurchaseOrderList";
// import WorkerSearchPO from "./pages/WorkerSearchPO";
// import LoginPage from "./pages/Login";

// import GlobalLayout from "./pages/layout";
// import Dashboard from "./components/Dashboard";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route element={<GlobalLayout />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route
//           path="/purchase-order/:id"
//           element={<PurchaseOrderDetailPage />}
//         />
//         <Route path="/purchase-list" element={<PurchaseOrderList />} />
//         <Route path="/worker-po" element={<WorkerSearchPO />} />
//       </Route>
//     </Routes>
//   );
// }

import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext";

import PurchaseOrderDetailPage from "./pages/PurchaseOrderDetailPage";
import PurchaseOrderList from "./components/PurchaseOrderList";
import WorkerSearchPO from "./pages/WorkerSearchPO";
import LoginPage from "./pages/Login";

import GlobalLayout from "./pages/layout";
import Dashboard from "./components/Dashboard";
import { JSX } from "react";

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Public route wrapper - redirects to dashboard if already logged in
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Public route - Login page */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/purchase-list" element={<PurchaseOrderList />} />
      <Route path="/purchase-order/:id" element={<PurchaseOrderDetailPage />} />
      {/* Protected routes under GlobalLayout */}
      <Route
        element={
          <ProtectedRoute>
            <GlobalLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/purchase-order/:id"
          element={<PurchaseOrderDetailPage />}
        />
        <Route path="/purchase-list" element={<PurchaseOrderList />} />
        <Route path="/worker-po" element={<WorkerSearchPO />} />
      </Route>

      {/* Fallback route to redirect to login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
