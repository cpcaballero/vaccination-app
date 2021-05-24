import React from "react"
import { useAuthState } from "../../context/auth"
import LoginBox from "../../components/auth/LoginBox"
import RegisterBox from "../../components/auth/RegisterBox"
import { Redirect } from "react-router-dom"
const Landing = ({ match, history }) => {
  const userDetails = useAuthState()

  if (userDetails.token) {
    return <Redirect to={{ pathname: "/dashboard/profile" }} />
  }

  return (
    <div
      className="p-d-flex p-jc-start p-flex-column"
      style={{ height: "100vh", width: "100vw", maxWidth: "100%" }}
    >
      <h1 className="p-text-center">--App-Logo--</h1>
      <h2 className="p-text-center">E-Consult</h2>
      {match.url === "/login" && <LoginBox history={history} />}
      {match.url === "/register" && <RegisterBox history={history} />}
    </div>
  )
}

export default Landing
