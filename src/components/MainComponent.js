import React, { useState } from "react"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { Divider } from "primereact/divider"
import FullNavbar from "./navbar/FullNavbar"
import QRCodeModal from './QRCodeModal'

const MainComponent = ({ content: Content, history }) => {
  const [sideBarVisible, toggleSidebarVisible] = useState(false)
  const [qrCodeVisible, setQRCodeVisible] = useState(false)
  return (
    <>
      <FullNavbar history={history} setQRCodeVisible={setQRCodeVisible}  />
      <div className="p-grid p-mx-5 p-mt-5">
        <Content history={history} />
        <QRCodeModal isVisible={qrCodeVisible} setQRCodeVisible={setQRCodeVisible} />
      </div>
    </>
  )
}

export default MainComponent
