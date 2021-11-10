import React, { useState, useEffect, useRef } from "react"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Message } from 'primereact/message';
import { useLocation } from 'react-router-dom/'
import {
  loginUser,
  AuthProvider,
  useAuthState,
  useAuthDispatch,
} from "../../context/auth"

const LoginBox = ({ history }) => {
  const location = useLocation()
  const { loading, errorMessage, user, token } = useAuthState()
  const usernameInput = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  
  const { username, password } = formData
  const dispatch = useAuthDispatch()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  
  const handleLogin = async (e) => {
    console.log(loading)
    try {
      await loginUser(dispatch, { username, password })  
    } catch (error) {
      console.log(error)
    }
  }


  useEffect( () => {
    usernameInput.current.focus()
  }, [])

  return (
    
      <Card title="Login" className="p-col-12 p-lg-offset-4 p-lg-4">
        <div className="p-fluid p-grid">
          <div className="p-field p-col-12">
            <span className="p-float-label">
              <InputText
                id="username"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
                ref={usernameInput}
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
          <div className="p-sm-12">
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
        { errorMessage && (<Message severity="error" text={errorMessage}/>) }
        <Divider />
        <div className="p-d-flex p-ai-center p-flex-column">
          <h3 className="p-text-center">Don't have an account?</h3>
          <Button
            label="Click here to register"
            className="p-button-link"
            onClick={() => history.push("/register")}
          />
        </div> 
      </Card>
    
  )
}

export default LoginBox
