import React from "react"
import { Dialog } from "primereact/dialog"
import QRCode from "qrcode.react"

const QRCodeModal = ({ isVisible, setQRCodeVisible, userDetails, dispatch }) => {
  const {
    patientId,
    firstName,
    middleName,
    lastName
  } = userDetails.user
  // console.log(userDetails)
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setQRCodeVisible(false)}
      header="Your QR Code for Scanning"
    >
      <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
        <QRCode
          value={patientId}
          className="p-as-center p-text-center"
          size={256}
          includeMargin={false}
        />
        <h4>
          {firstName} {middleName} {lastName}
        </h4>
        <small>ID No: {patientId}</small>
      </div>
    </Dialog>
  )
}

export default QRCodeModal
