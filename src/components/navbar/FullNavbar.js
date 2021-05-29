import React, { useState } from "react"
import MainNavbar from "./MainNavbar"
import MainSidebar from "./MainSidebar"

const FullNavbar = ({ history, setQRCodeVisible }) => {
  const [sideBarVisible, toggleSidebarVisible] = useState(false)
  let navLinks = [
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
    {
      name: "Schedules",
      path: "/dashboard/schedules",
    },
    {
      name: "Files",
      path: "/dashboard/files",
    },
  ]
  return (
    <>
      <MainNavbar
        sideBarVisible={sideBarVisible}
        toggleSidebarVisible={toggleSidebarVisible}
        navLinks={navLinks}
        history={history}
        setQRCodeVisible={setQRCodeVisible}
      />
      <MainSidebar
        sideBarVisible={sideBarVisible}
        toggleSidebarVisible={toggleSidebarVisible}
        navLinks={navLinks}
        history={history}
        setQRCodeVisible={setQRCodeVisible}
      />
    </>
  )
}

export default FullNavbar
