import React, { useState, useEffect } from "react"
import { Card } from "primereact/card"

import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Steps } from "primereact/steps"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"

import AddressComponent from "../AddressComponent"
import FormInput from "../FormInput"
import basicInfoForm from "../../utils/basicInfoForm"
import personalInfoForm from "../../utils/personalInfoForm"

import { createUser } from '../../context/auth/actions'

import {
  loginUser,
  AuthProvider,
  useAuthState,
  useAuthDispatch,
} from "../../context/auth"

const RegisterBox = ({ history }) => {
  const items = [
    { label: "Basic" },
    { label: "Personal" },
    { label: "Address" },
  ]
  const { loading, errorMessage } = useAuthState()
  const dispatch = useAuthDispatch()
  const [blankFields, setBlankFields] = useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    sex: "",
    civilStatus: "",
    emergencyPerson: "",
    emergencyContact: "",
    houseBldgStreet: "",
    region: "",
    provinceState: "",
    cityMunicipality: "",
    barangay: "",
    zipPostal: "",
    // termsAgree: true,
    covidClassification: "",
  })

  const {
    firstName,
    middleName,
    lastName,
    emailAddress,
    mobileNumber,
    birthDate,
    sex,
    civilStatus,
    emergencyContact,
    emergencyPerson,
    houseBldgStreet,
    region,
    provinceState,
    cityMunicipality,
    barangay,
    zipPostal,
    termsAgree,
    covidClassification,
    password,
    confirmPassword
  } = formData

  const [activeIndex, setActiveIndex] = useState(0)

  let basicFormObject = basicInfoForm({
    firstName,
    middleName,
    lastName,
    mobileNumber,
    emailAddress,
    password,
    confirmPassword
  })

  let personalFormObject = personalInfoForm({
    birthDate,
    sex,
    civilStatus,
    covidClassification,
    emergencyContact,
    emergencyPerson,
  })

  
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  
  const handleSubmit = async () => {
    const tempBlankFields = []
    for (const [key, value] of Object.entries(formData)){
      console.log("key " + key + " value " +  value)
      if(key !== "middelName" && value === ""){ 
        tempBlankFields.push(key)
      }  
    }
    setBlankFields(tempBlankFields)

    if (tempBlankFields.length > 0 ) { 
      return
    }
    else{
      const mongoResponse = await createUser(dispatch, {...formData, src: "frontend"})
      // const mongoResponse = await fetch('/api/v1/auth', methodOptions)
      if(!mongoResponse.success) {
        alert("Failed to save client ")
      }
      else{
        console.log(mongoResponse)
        const postToServer = mongoResponse.data
        // postToServer = postToServer.data
        console.log(postToServer)
        delete postToServer["_id"]
        delete postToServer["__v"]
        let qrCode = postToServer["patientId"]
        postToServer["qrCode"] = qrCode
        postToServer["src"] = "frontend"
        const serverMethodOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...postToServer})
        }
        console.log(postToServer)
        const serverResponse = await fetch('https://francophone-celsius-32987.herokuapp.com/https://bakuna.sollertiainc.com/rest/vaccinee', serverMethodOptions)  
        history.push("/login", {
          state: { confirmRegister: "Registration success. You may now login"}
        })
        // }).then(jb_respose => {
        //   console.log(jb_respose)
        
      }
    }
  }

  return (
    <AuthProvider>
      <Card
        title="Vaccinee Registration"
        subTitle="All fields with asterisk (*} are required"
        className="p-col-12 p-lg-offset-4 p-lg-4"
      >
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          className="p-mb-5"
        />
        { blankFields.length > 0 && (<>
          <small className="p-error">Complete all required fields with * to register</small><br/><br/>
          </>
        )}
        {activeIndex === 0 && (
          <div className="p-fluid p-grid">
            {basicFormObject.map((item) => (
              <FormInput
                {...item}
                type={item.type}
                nameId={item.nameId}
                value={item.value}
                label={item.label}
                onChange={(e) => onChange(e)}
                className={ (blankFields.includes(item.nameId) && item.required) ? "p-invalid" : "" }
              />
            ))}
            {
              (password !== confirmPassword && password !== "") && <small className="p-error p-d-block">Passwords do not match</small>
            }
            <div className="p-col-12">
              <Button
                disabled={ !(password === confirmPassword && password !== "") }
                label="Next"
                className="p-button-primary"
                onClick={() => setActiveIndex(1)}
              />
            </div>
          </div>
        )}

        {activeIndex === 1 && (
          <div className="p-fluid p-grid">
            {personalFormObject.map((item) => (
              <FormInput
                {...item}
                type={item.type}
                nameId={item.nameId}
                value={item.value}
                label={item.label}
                onChange={(e) => onChange(e)}
                className={ (blankFields.includes(item.nameId) && item.required) ? "p-invalid" : "" }
              />
            ))}
            <div className="p-col-12 p-d-flex p-flex-row p-jc-between">
              <Button
                label="Back"
                className="p-mx-2 p-button-outlined p-button-secondary"
                onClick={() => setActiveIndex(0)}
              />
              <Button
                label="Next"
                className="p-mx-2 p-button-primary"
                onClick={() => setActiveIndex(2)}
              />
            </div>
          </div>
        )}

        {activeIndex === 2 && (
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText
                  id="houseBldgStreet"
                  name="houseBldgStreet"
                  value={houseBldgStreet}
                  onChange={(e) => onChange(e)}
                  className={ blankFields.includes("houseBldgStreet") ? "p-invalid" : "" }
                />
                <label htmlFor="houseBldgStreet">
                  House # / Building / Street
                </label>
              </span>
            </div>

            <AddressComponent
              formData={formData}
              setFormData={setFormData}
              region={region}
              provinceState={provinceState}
              cityMunicipality={cityMunicipality}
              barangay={barangay}
              blankFields={blankFields}
            />

            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText
                  id="zipPostal"
                  name="zipPostal"
                  value={zipPostal}
                  onChange={(e) => onChange(e)}
                  className={ blankFields.includes("zipPostal") ? "p-invalid" : "" }
                />
                <label htmlFor="zipPostal">Zip / Postal Code</label>
              </span>
            </div>

            {/* <div className="p-field p-col-12">
              <div className="p-field-checkbox">
                <Checkbox
                  inputId="termsAgree"
                  name="termsAgree"
                  checked={termsAgree}
                  onChange={() =>
                    setFormData({ ...formData, termsAgree: !termsAgree })
                  }
                />
                <label htmlFor="termsAgree">
                  Click the checkbox to agree to our{" "}
                  <span onClick={() => alert("test")}>
                    {" "}
                    Terms &amp; Conditions
                  </span>
                </label>
              </div>
            </div> */}
            <div className="p-col-12 p-d-flex p-flex-row p-jc-between">
              <Button
                label="Back"
                className="p-mx-2 p-button-outlined p-button-secondary"
                onClick={() => setActiveIndex(1)}
              />
              <Button
                label="Submit"
                className="p-mx-2 p-button-primary"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        )}

        <Divider />
        <div className="p-d-flex p-ai-center p-flex-column">
          <h3 className="p-text-center">Already have an account?</h3>
          <Button
            label="Click here to Login"
            className="p-button-link"
            onClick={() => history.push("/login")}
          />
        </div>
      </Card>
    </AuthProvider>
  )
}

export default RegisterBox
