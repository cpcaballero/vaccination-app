import axios from "axios"
import setAuthToken from "../../utils/setAuthToken"

const ROOT_URL =
  process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : ""

export const createUser = async (dispatch, formData) => {
  console.log("ACTIONS")
  let res = null
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    res = await axios.post(`/api/v1/auth`, formData, config)
    console.log(res)
    if (res.data.success) {
      return {
        success: true,
        data: res.data.user,
      }
    } else {
      return {
        success: false,
      }
    }
  } catch (err) {
    // const errors = err.response.data.msg;
    console.log(err)
    dispatch({ type: "LOGIN_ERROR", error: err })
    return err
  }
}

export const insertDependent = async (dispatch, formData) => {
  let res = null
  try{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    res = await axios.post(`/api/v1/auth/insert-dependent`, formData, config)
    console.log(res)
    if (res.data.success) {
      return {
        success: true,
        data: res.data.user,
      }
    } else {
      return {
        success: false,
      }
    }
  } catch(err) {

  }
}

export const loginUser = async (dispatch, payload) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
  }

  try {
    console.log("inside try login_user")
    dispatch({ type: "REQUEST_LOGIN" })
    const response = await axios.post(
      `/api/v1/auth/login`,
      payload,
      requestOptions
    )

    if (response.status == 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
    } else {
      const data = {
        error: "Incorrect Username or password",
      }
      dispatch({ type: "LOGIN_ERROR", error: data.error })
    }
  } catch (error) {
    
    dispatch({ type: "LOGIN_ERROR", error: error.response.data.msg })
  }
}

export const loadUser = async (dispatch) => {
  if (localStorage.getItem("token")) {
    console.log("GOT TOKEN")
    setAuthToken(localStorage.getItem("token"))
    try {
      const res = await axios.get('/api/v1/auth/user');
      console.log(res)
      console.log("USER LOADED ACTION")
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      })
    } catch (error) {
      console.table(error.response.data)
      if(error.response.data.msg.name === "TokenExpiredError"){
        dispatch({ type: "LOGIN_ERROR", error: "Session expired. Please log in" });
      } else{
        dispatch({ type: "LOGIN_ERROR", error: error.response.data.msg.message });
      }
      // dispatch({ type: "LOGIN_ERROR", error: error })
      // dispatch({ type: "LOGOUT" })
    }
  } else {
    localStorage.removeItem("currentUser")
    dispatch({ type: "LOGOUT" })
  }
}

export const getVaccinee = async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/auth/user');
    console.log(res)
    console.log("USER LOADED ACTION")
    dispatch({
      type: "GET_VACCINEE",
      payload: res.data,
    })
  } catch (error) {
    console.table(error)
    dispatch({ type: "LOGIN_ERROR", error: error })
  }
  
}

export const logout = async (dispatch) => {
  localStorage.removeItem("currentUser")
  dispatch({ type: "LOGOUT" })
}

export const getLocations = async (dispatch) => {
  dispatch({ type: "LOCATION_LOADING"})
  try {
    const res = await axios.get('/api/v1/location');
    console.log(res)
    console.log("LOCATION LOADED ACTION")
    dispatch({
      type: "LOCATION_LOADED",
      payload: res.data,
    })
  } catch (error) {
    console.table(error.response.data)
    dispatch({ type: "LOCATION_ERROR", error: error.response.data.msg })
  }
}
export const getSchedules = async (dispatch) => {
  dispatch({ type: "SCHEDULE_LOADING" });
  try{
    const res = await axios.get('/api/v1/schedule');
    dispatch({
      type: "SCHEDULE_LOADED",
      payload: res.data,
    });
  } catch(error) {
    console.table(error.response.data);
    dispatch({ type: "SCHEDULE_ERROR", error: error.response.data.msg });
  }
} 


export const confirmBooking = async (dispatch, formData ) => {
  console.log('inside confirmbooking')
  let res = null;
  
  try{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    
    res = await axios.post(`/api/v1/schedule/confirm-book`, formData, config);
    dispatch(({ type: "BOOKING_LOADED" }));
    return res.data;
  } catch (error) {
    dispatch({ type: "BOOKING_ERROR", error: error.response.data.msg });
  }
}

export const saveBooking = async (dispatch, formData) => {
  console.log('inside savebooking')
  let res = null;
  
  try{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    
    res = await axios.post(`/api/v1/schedule/save-book`, formData, config);
    dispatch(({ type: "BOOKING_LOADED" }));
    return res.data;
  } catch (error) {
    dispatch({ type: "BOOKING_ERROR", error: error.response.data.msg });
  }
}