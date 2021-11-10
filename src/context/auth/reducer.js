export const initialState = {
  user:  null,
  token: localStorage.getItem("token"),
  loading: false,
  errorMessage: null,
  vaccinee: null,
  dependents: [],
  locations: [],
  schedules: [],
  locationLoading: false,
  scheduleLoading: false,
  bookingLoading: false,
}
/** 
  if token is null, it's not authenticated. 
  if it is not null, then the user must be also with value. 
  if no user is in localStorage, redirect to login
*/

export const AuthReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  console.log("CURRENT STATE")
  console.log(state)
  console.log("INCOMING PAYLOAD")
  console.log(payload)
  
  switch (type) {
    case "REQUEST_LOGIN":
      console.log("REQUEST_LOGIN REDUCER")
    case "USER_LOADING":
      console.log("USER_LOADING REDUCER")
      console.log("USER_LOADING PAYLOAD")
      console.log(payload)
      return {
        ...state,
        loading: true,
      }
    
    case "USER_LOADED":
      console.log("USER_LOADED REDUCER")
      console.log("USER_LOADED PAYLOAD")
      console.log(payload)
      return { 
        ...state,
        user: payload.user,
        token: localStorage.getItem("token"),
        loading: false,

      }
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS REDUCER")
      console.log("LOGIN_SUCCESS PAYLOAD")
      console.log(payload)
      // localStorage.setItem("currentUser", JSON.stringify(payload.user))
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
      }

    case "LOGOUT":
      localStorage.removeItem("token")
      console.log("LOGOUT REDUCER")
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      }

    case "LOGIN_ERROR":
      localStorage.removeItem("token")
      console.log(error)
      return {
        ...state,
        loading: false,
        errorMessage: error,
        token: null
      }

    case "GET_VACCINEE":
      console.log("GET VACCINEE REDUCER")
      // console.log(payload)
      console.log(payload.user)
      return {
        ...state,
        loading: false,
        vaccinee : payload.user
      }
    /** LOCATION CASES */
    case "LOCATION_LOADING":
      return {
        ...state,
        locationLoading: true
      }
    case "LOCATION_LOADED":
      return {
        ...state,
        locations: payload.locations,
        locationLoading: false
      }
    case "LOCATION_ERROR" : 
      return {
        ...state,
        locationLoading: false,
        errorMessage: error,
      }
    /** SCHEDULE CASES */
    case "SCHEDULE_LOADING":
      return {
        ...state,
        scheduleLoading: true
      }
    case "SCHEDULE_LOADED":
      return {
        ...state,
        schedules: payload.schedules,
        scheduleLoading: false
      }
    case "SCHEDULE_ERROR" : 
      return {
        ...state,
        scheduleLoading: false,
        errorMessage: error,
      }
    /** BOOKING CASES */
    case "BOOKING_LOADING":
      return {
        ...state,
        bookingLoading: true
      }
    case "BOOKING_LOADED":
      return {
        ...state,
        scheduleLoading: false,
      }
    case "BOOKING_ERROR" : 
      return {
        ...state,
        bookingLoading: false,
        errorMessage: error,
      }
    default:
      return state; 
  }
}
