import React, { useState } from "react"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import {
  loginUser,
  AuthProvider,
  useAuthState,
  useAuthDispatch,
} from "../../context/auth"

const LoginBox = ({ history }) => {
  const { loading, errorMessage } = useAuthState()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const { username, password } = formData
  const dispatch = useAuthDispatch()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  
  const handleLogin = async (e) => {
    console.log("HERE WITHOUT ERROR")
    console.log(loading)
    try {
      let response = await loginUser(dispatch, { username, password })
      console.log(response)
      if (!response) {
        return
      }
      console.log(loading)
      history.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthProvider>
      <Card title="Login" className="p-col-12 p-lg-offset-4 p-lg-4">
        <div className="p-fluid p-grid">
          <div className="p-field p-col-12">
            <span className="p-float-label">
              <InputText
                id="username"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor="username">Email</label>
            </span>
          </div>
          <div className="p-field p-col-12">
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                toggleMask
                feedback={false}
                value={password}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <div className="p-md-4">
            <Button label="Forgot Password?" className="p-button-link" />
          </div>
          <div className="p-col-12">
            {loading && (
              <Button
                label="LOGIN"
                className="p-button-primary"
                onClick={(e) => handleLogin(e)}
                disabled
              />
            )}
            {!loading && (
              <Button
                label="LOGIN"
                className="p-button-primary"
                onClick={(e) => handleLogin(e)}
              />
            )}
          </div>
        </div>
        <Divider />
        <div className="p-d-flex p-jc-center p-flex-column">
          <h3 className="p-text-center">Don't have an account?</h3>
          <Button
            label="Click here to register"
            className="p-button-link"
            onClick={() => history.push("/register")}
          />
        </div>
        {errorMessage}
      </Card>
    </AuthProvider>
  )
}

export default LoginBox
