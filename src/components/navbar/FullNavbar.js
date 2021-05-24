import React, { useState } from "react"
import MainNavbar from "./MainNavbar"
import MainSidebar from "./MainSidebar"

const FullNavbar = ({ history }) => {
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
      />
      <MainSidebar
        sideBarVisible={sideBarVisible}
        toggleSidebarVisible={toggleSidebarVisible}
        navLinks={navLinks}
        history={history}
      />
    </>
  )
}

export default FullNavbar
