import React from "react"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { Divider } from "primereact/divider"
import { Avatar } from 'primereact/avatar';
import './style.css'

const MainSidebar = ({
  sideBarVisible,
  toggleSidebarVisible,
  history,
  navLinks,
  setQRCodeVisible,
  userDetails
}) => {
  let viewQRCode = false
  const customIcon = () => {
    return(
      <div>
        <Button icon="pi pi-arrow-left" className="p-button-text p-button-secondary p-button-lg" onClick={ () => toggleSidebarVisible(false)} />
      </div>
    )
  }
  

  return (
    <Sidebar
      visible={sideBarVisible}
      position="left"
      className="ui-sidebar-lg"
      blockScroll={true}
      showCloseIcon={false}
      onHide={() => toggleSidebarVisible(false)}
      icons={ () => customIcon()}
    >
      <img
        src={process.env.PUBLIC_URL + "/mylogo.png"}
        alt="test"
        style={{
          width: "80px",
          height: "80px",
          textAlign: "center"
        }}
      />
      <h1 className="">Vaccine App</h1>
      <div className="p-d-flex p-jc-start p-flex-column">
        <div className="p-d-flex p-flex-row p-jc-start p-ai-center">
        <Avatar icon="pi pi-user" className="p-mr-2" size="xlarge" shape="circle" />
        <h4>{userDetails.user.firstName} {userDetails.user.middleName} {userDetails.user.lastName} </h4>
        </div>
        <Button
          icon="pi pi-th-large"
          label="View QR"
          className="p-button-raised p-button-success p-button-sm p-as-start"
          onClick={ () => setQRCodeVisible(true) }
        />
      </div>
      
      
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
            onClick={() => history.push(item.path)}
          />
        ))}
      </div>
    </Sidebar> 
    
  )
}

export default MainSidebar
