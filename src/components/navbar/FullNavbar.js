import React, { useState } from "react"
import MainNavbar from "./MainNavbar"
import MainSidebar from "./MainSidebar"

const FullNavbar = ({ history, setQRCodeVisible, userDetails }) => {
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
    {
      name: "Dependents",
      path: "/dashboard/dependents",
    }
  ]
  return (
    <>
      <MainNavbar
        sideBarVisible={sideBarVisible}
        toggleSidebarVisible={toggleSidebarVisible}
        navLinks={navLinks}
        history={history}
        setQRCodeVisible={setQRCodeVisible}
        userDetails={userDetails}
      />
      <MainSidebar
        sideBarVisible={sideBarVisible}
        toggleSidebarVisible={toggleSidebarVisible}
        navLinks={navLinks}
        history={history}
        setQRCodeVisible={setQRCodeVisible}
        userDetails={userDetails}
      />
    </>
  )
}

export default FullNavbar
