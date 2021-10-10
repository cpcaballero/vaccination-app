import React, { useState } from "react"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { Divider } from "primereact/divider"
import FullNavbar from "./navbar/FullNavbar"
import QRCodeModal from "./QRCodeModal"

const MainComponent = ({
  content: Content,
  history,
  userDetails,
  dispatch,
}) => {
  const [sideBarVisible, toggleSidebarVisible] = useState(false)
  const [qrCodeVisible, setQRCodeVisible] = useState(false)
  console.log("MAINCOMPONENT BEFORE PASSING CONTENT AND QRMODAL")
  console.log(userDetails)
  return (
    !(userDetails.loading) && (
    <>
      <FullNavbar history={history} setQRCodeVisible={setQRCodeVisible} userDetails={userDetails} />
      <div className="p-grid p-mx-1 p-mt-1">
        <Content
          history={history}
          userDetails={userDetails}
          dispatch={dispatch}
        />
        <QRCodeModal
          isVisible={qrCodeVisible}
          setQRCodeVisible={setQRCodeVisible}
          userDetails={userDetails}
          dispatch={dispatch}
        />
      </div>
    </>
    )
  )
}

export default MainComponent
