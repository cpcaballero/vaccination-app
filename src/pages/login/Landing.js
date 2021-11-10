import React, { useEffect} from "react"
import { useAuthState } from "../../context/auth"
import LoginBox from "../../components/auth/LoginBox"
import RegisterBox from "../../components/auth/RegisterBox"
import { Redirect } from "react-router-dom"
// import Logo  from './Landing'

const Landing = ({ match, history }) => {
  const userDetails = useAuthState()
  useEffect( () => {
    console.log("test")
    console.log(userDetails)
    if (userDetails.token) {
      console.log("Landing - context token changed")
      history.push("/dashboard/profile")
    }
    
  }, [userDetails, history])


  return (
    <div
      className="p-d-flex p-jc-start p-flex-column p-pt-5"
      style={{ height: "100vh", width: "100vw", maxWidth: "100%" }}
    >
      {/* <h1 className="p-text-center">--App-Logo--</h1> */}
      <div className="p-d-flex p-jc-center p-ai-center p-flex-column">
        <img
          src={process.env.PUBLIC_URL + "mylogo.png"}
          alt="test"
          style={{
            width: "200px",
            height: "200px",
            textAlign: "center"
          }}
        />
      </div>
      <h2 className="p-text-center">Vaccination App</h2>
      {match.url === "/login" && <LoginBox history={history} />}
      {match.url === "/register" && <RegisterBox history={history} />}
    </div>
  )
}

export default Landing
