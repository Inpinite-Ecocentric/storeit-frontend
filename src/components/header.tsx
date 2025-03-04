import { useState } from "react";
import "../styles/Global.css";

interface HeaderProps {
  onToggle: (isCollapsed: boolean) => void; // Accept onToggle as a prop
}

export default function Header({ onToggle }: HeaderProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed);
  };

  return (
    <div className="dropdown borderBottom d-flex justify-content-between align-items-center p-1">
      <div className="d-flex align-items-center">
      <button className="btn  mb-1" onClick={toggleSidebar}>
        <img src="/icons/hamburger-header.svg" />
       
      </button>
      <div className="headingLabel">Store It</div>
      </div>
      
      
      <div className="d-flex align-items-center">
        <img
          src="/icons/admin.svg"
          alt="Matscope Logo"
          width="70"
          height="40"
        />
        <button
          className="bg-transparent border-0 text-dark d-flex flex-column p-1"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          First Name
          <span>
            Admin <img src="/icons/downarrow.svg" />
          </span>
        </button>
        <ul className="dropdown-menu p-2" aria-labelledby="dropdownMenuButton">
          <li>
            <button className="dropdown-item d-flex align-items-center">
              <span>
                <img
                  src="/icons/userlogo.svg"
                  alt="Profile"
                  width="15"
                  height="15"
                  className="m-2"
                />
              </span>{" "}
              User Profile
            </button>

            <button className="dropdown-item d-flex align-items-center">
              <span>
                <img
                  src="/icons/password.svg"
                  alt="Change Password"
                  width="15"
                  height="15"
                  className="m-2"
                />
              </span>
              Change Password
            </button>

            <button className="dropdown-item d-flex align-items-center">
              <span>
                <img
                  src="/icons/logout.svg"
                  alt="Log Out"
                  width="15"
                  height="15"
                  className="m-2"
                />
              </span>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}