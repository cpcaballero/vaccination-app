import React from "react"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { Divider } from "primereact/divider"

const MainSidebar = ({
  sideBarVisible,
  toggleSidebarVisible,
  history,
  navLinks,
}) => {
  return (
    <Sidebar
      visible={sideBarVisible}
      position="left"
      className="ui-sidebar-lg"
      onHide={() => toggleSidebarVisible(false)}
    >
      <h1 className="p-mx-3">App Logo Here</h1>
      <Divider />
      <div className="p-d-flex p-jc-start p-ai-stretch p-flex-column">
        {navLinks.map((item) => (
          <Button
            label={item.name}
            key={item.path}
            className={`p-button-lg p-text-left ${
              item.path === history.location.pathname
                ? "p-button-primary"
                : "p-button-text p-button-plain"
            }`}
          />
        ))}
      </div>
    </Sidebar>
  )
}

export default MainSidebar
