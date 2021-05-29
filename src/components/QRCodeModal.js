import React from "react"
import { Dialog } from "primereact/dialog"
import QRCode from "qrcode.react"

const QRCodeModal = ({ isVisible, setQRCodeVisible }) => {
  console.log(isVisible)
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setQRCodeVisible(false)}
      header="Your QR Code for Scanning"
    >
      <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
        <QRCode value="A193-3BCD-519C-F00D" className="p-as-center p-text-center" size={256} includeMargin={false} />
        <h4>Juan Miguel Marquez Barera</h4>
        <small>ID No: A193-3BCD-519C-F00D</small>
      </div>
    </Dialog>
  )
}

export default QRCodeModal
