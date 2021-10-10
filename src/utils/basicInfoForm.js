const basicInfoForm = (props) => {
  let returnArray = []
  if("firstName" in props){
    returnArray.push({
      nameId: "firstName",
      value: props.firstName,
      type: "text",
      label: "First Name",
      required: true,
    })
  }
  if("middleName" in props){
    returnArray.push({
      nameId: "middleName",
      value: props.middleName,
      type: "text",
      label: "Middle Name",
      required: false,
    })
  }
  if("lastName" in props){
    returnArray.push({
    nameId: "lastName",
    value: props.lastName,
    type: "text",
    label: "Last Name",
    required: true,
  })
  }
  if("mobileNumber" in props){
    returnArray.push({
    nameId: "mobileNumber",
    value: props.mobileNumber,
    type: "text",
    label: "Mobile Number",
    required: true,
  })
  }
  if("emailAddress" in props){
    returnArray.push({
    nameId: "emailAddress",
    value: props.emailAddress,
    type: "text",
    label: "Email",
    required: true,
  })
  }
  if("password" in props){
    returnArray.push({
      nameId: "password",
      value: props.password,
      type: "password",
      label: "Password",
      required: true,
    })
  }
  if("confirmPassword" in props){
    returnArray.push({
      nameId: "confirmPassword",
      value: props.confirmPassword,
      type: "password",
      label: "Confirm Password",
      required: true,
      feedback: false
    })
  }
  return returnArray

}
export default basicInfoForm