/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import "../styles/Global.css"; 
import { useAuth } from "./AuthContext";

interface SidebarProps {
  isCollapsed: boolean; // Accept isCollapsed as a prop
  onToggle: (isCollapsed: boolean) => void;
}

export default function SideBarLayout({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { isAdmin, isWorker, isSupervisor } = useAuth(); // Get user role

  const getLinkClass = (path: string) => {
    return location.pathname.includes(path) ? "bg-light" : "";
  };

  // Helper function to get the correct dashboard path based on user role
  const getDashboardPath = () => {
    return "/dashboard";
  };

  // Helper function to get the correct purchase order path based on user role
  const getPOPath = () => {
    return "/purchase-order";
  };

  // Helper function to get the purchase list path
  const getPurchaseListPath = () => {
    return "/purchase-list";
  };

  return (
    <div
      className="d-flex flex-column bg-white text-black vh-100 sidebarScroll"
      style={{
        width: isCollapsed ? "8%" : "18%",
        transition: "width 0.3s",
      }}
    >
      <ul className="nav flex-column align-items-center sidebarFont">
        <li className={`nav-item text-center mb-3 ${getLinkClass("/dashboard")}`}>
          <Link
            to={getDashboardPath()}
            className="nav-link text-black d-flex flex-column align-items-center p-0"
          >
            <img src="/icons/icon_accounts.svg" alt="dashboard" width={40} height={50} />
            {isCollapsed ? (
              <span className="text-center">Dashboard</span>
            ) : (
              <span className="ms-2 text-truncate">Dashboard</span>
            )}
          </Link>
        </li>

        <li className={`nav-item text-center mb-3 ${getLinkClass("/purchase-order")}`}>
          <Link
            to={getPOPath()}
            className="nav-link text-black d-flex flex-column align-items-center p-0"
          >
            <img src="/icons/icon_accounts.svg" alt="po" width={40} height={50} />
            {isCollapsed ? (
              <span className="text-center">PO</span>
            ) : (
              <span className="ms-2 text-truncate">Purchase Order</span>
            )}
          </Link>
        </li>

        <li className={`nav-item text-center mb-3 ${getLinkClass("/purchase-list")}`}>
          <Link
            to={getPurchaseListPath()}
            className="nav-link text-black d-flex flex-column align-items-center p-0"
          >
            <img src="/icons/icon_accounts.svg" alt="po-list" width={40} height={50} />
            {isCollapsed ? (
              <span className="text-center">PO List</span>
            ) : (
              <span className="ms-2 text-truncate">Purchase List</span>
            )}
          </Link>
        </li>

        <li className={`nav-item text-center mb-3 ${getLinkClass("/bom")}`}>
          <Link
            to="/bom"
            className="nav-link text-black d-flex flex-column align-items-center p-0"
          >
            <img src="/icons/icon_accounts.svg" alt="bom" width={40} height={50} />
            {isCollapsed ? (
              <span className="text-center">BOM</span>
            ) : (
              <span className="ms-2 text-truncate">Bill of Materials</span>
            )}
          </Link>
        </li>

        <li className={`nav-item text-center mb-3 ${getLinkClass("/worker-po")}`}>
          <Link
            to="/worker-po"
            className="nav-link text-black d-flex flex-column align-items-center p-0"
          >
            <img src="/icons/icon_accounts.svg" alt="settings" width={40} height={50} />
            {isCollapsed ? (
              <span className="text-center">Settings</span>
            ) : (
              <span className="ms-2 text-truncate">Settings</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}