let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : ""
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : ""

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
}

export const AuthReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case "REQUEST_LOGIN":
      console.log("REQUEST_LOGIN REDUCER")
    case "USER_LOADING":
      console.log("USER_LOADING REDUCER")
      return {
        ...state,
        loading: true,
      }
    case "USER_LOADED":
      console.log("USER_LOADED REDUCER")
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS REDUCER")
      return {
        ...state,
        user: payload.user,
        token: payload.auth_token,
      }
    case "LOGOUT":
      console.log("LOGOUT REDUCER")
      return {
        ...state,
        user: null,
        token: null,
      }

    case "LOGIN_ERROR":
      console.log("LOGIN_ERROR REDUCER")
      return {
        ...state,
        loading: false,
        errorMessage: error,
      }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}
