// import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken"

// const ROOT_URL =
//   process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : ""



export const loginUser = async (dispatch, payload) => {
  // const requestOptions = {
  //   headers: { "Content-Type": "application/json" },
  // }

  try {
    console.log("inside try login_user")
    console.log(dispatch({ type: "REQUEST_LOGIN" }))
    // let response = await axios.post(`${ROOT_URL}/login`, payload, requestOptions)
    // let data = await response.json({
    //   firstName: "John",
    //   lastName: "Doe"
    // })
    let data = null
    if (
      payload.username === "demo" &&
      payload.password === "test123"
    ) {
      data = {
        user: {
          firstName: "John",
          lastname: "Doe",
          username: "johnwickdoe",
        },
        auth_token: "123testtoken456",
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: data })
      localStorage.setItem("currentUser", JSON.stringify(data))
    } else {
      data = {
        errors: ["Incorrect Username or password"],
      }
      dispatch({ type: "LOGIN_ERROR", error: data.errors[0] })
    }

    return data
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error })
  }
}

export const loadUser = async (dispatch) => {
  if (JSON.parse(localStorage.getItem("currentUser")).auth_token) {
    console.log("GOT TOKEN")
    setAuthToken(JSON.parse(localStorage.getItem("currentUser")).auth_token)
    try {
      // const res = await axios.get('/api/auth');
      // console.log(res)
      let response = {
        data: {
          user: {
            firstName: "John",
            lastname: "Doe",
            username: "johnwickdoe",
          },
          auth_token: "123testtoken456",
        },
      }
      console.log("USER LOADED ACTION")
      dispatch({
        type: "USER_LOADED",
        payload: response.data,
      })
    } catch (error) {
      console.table(error)
      dispatch({ type: "LOGIN_ERROR", error: error })
    }
  } else {
    localStorage.removeItem("currentUser")
    dispatch({ type: "LOGOUT" })
  }
}

export const logout = async (dispatch) => {
  localStorage.removeItem("currentUser")
  dispatch({ type: "LOGOUT" })
}
