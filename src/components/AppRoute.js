import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useAuthState } from "../context/auth/"


const AppRoutes = ({ component: Component, content, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState()
  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component content={content} {...props} />
        )
      }
    />
  )
}

export default AppRoutes
