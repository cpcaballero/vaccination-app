import React, { useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { loadUser, useAuthState, useAuthDispatch } from "../context/auth"

const AppRoutes = ({
  component: Component,
  content,
  path,
  isPrivate,
  ...rest
}) => {
  const userDetails = useAuthState()
  const history = useHistory()
  const dispatch = useAuthDispatch()

  useEffect(() => {
    console.log("approute " + path)
    console.log(userDetails)
    if (userDetails.token !== null) {
      console.log("APPROUTE FOUND TOKEN, CALLING LOADUSER")
      dispatch({type: "USER_LOADING"})
      loadUser(dispatch)
    } else {
      if (userDetails.token === null) {
        if(path === "/login"){
          history.push("/login")
        }
        else if (path === "/register"){
          history.push("/register")
        }
        
      } else if (!isPrivate) {
        console.log("NOT PRIVATE and no token")
        history.push(path)
      }
    }
  }, [])

  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : userDetails && (
          <Component
            content={content}
            {...props}
            userDetails={userDetails}
            dispatch={dispatch}
          />
        )
      }
    />
  )
}

export default AppRoutes
