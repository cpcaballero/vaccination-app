import React from "react"
import { QRCode } from "qrcode.react"
import { Button } from "primereact/button"
import {
  loginUser,
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  logout,
} from "../../context/auth"

const MainNavbar = ({
  sideBarVisible,
  toggleSidebarVisible,
  history,
  navLinks,
  setQRCodeVisible
}) => {
  const { loading, errorMessage } = useAuthState()
  const dispatch = useAuthDispatch()
  const logoutAccount = async () => {
    try {
      let response = await logout(dispatch)
      console.log(response)
      if (!response) {
        return
      }
      console.log(loading)
      history.push("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-d-flex p-jc-between p-shadow-3">
      <div className="p-d-flex p-jc-start">
        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-plain p-button-lg p-d-lg-none p-d-inline-flex"
          onClick={() => toggleSidebarVisible(true)}
        />
        <h1 className="p-mx-3">App Logo Here</h1>
        <div className="buttonset p-d-none p-d-lg-flex p-ai-center ">
          {navLinks.map((item) => (
            <Button
              label={item.name}
              key={item.path}
              className={`p-button-lg ${
                item.path === history.location.pathname
                  ? "p-button-primary"
                  : "p-button-text p-button-plain"
              }`}
              onClick={() => history.push(item.path)}
            />
          ))}
        </div>
      </div>
      <div className="p-d-flex p-jc-end">
        <Button
          label="View QR Code"
          icon="pi pi-th-large"
          className="p-button-text p-button-plain p-button-success p-button-lg p-d-none p-d-lg-flex"
          onClick={ () => setQRCodeVisible(true)}
        />
        <Button
          label="Log out"
          className="p-button-text p-button-plain"
          onClick={() => logoutAccount()}
        />
      </div>
    </div>
  )
}

export default MainNavbar
