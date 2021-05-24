import React, { useState } from "react"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { Divider } from "primereact/divider"
import FullNavbar from "./navbar/FullNavbar"

const MainComponent = ({ content: Content, history }) => {
  const [sideBarVisible, toggleSidebarVisible] = useState(false)
  return (
    <>
      <FullNavbar history={history} />
      <div className="p-grid p-mx-5 p-mt-5">
        <Content />
      </div>
    </>
  )
}

export default MainComponent
