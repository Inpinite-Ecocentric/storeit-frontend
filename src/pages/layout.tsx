/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "../styles/global.css";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import SideBarLayout from "../components/sideBar";



export default function GlobalLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="overflowHidden vh-100">
      <Header onToggle={setIsCollapsed} />
      <div className="d-flex  ">
        <SideBarLayout onToggle={setIsCollapsed} isCollapsed={isCollapsed} />

        <div className="vh-100 vw-100 contentArea">
          <Outlet />
        </div>
      </div>
    </div>
  );
}