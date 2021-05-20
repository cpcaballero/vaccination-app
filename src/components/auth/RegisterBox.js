import React, { useState, useEffect } from "react"
import { Card } from "primereact/card"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Steps } from "primereact/steps"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"

const RegisterBox = ({ history }) => {
  const items = [
    { label: "Basic" },
    { label: "Personal" },
    { label: "Address" },
  ]

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    birthDate: null,
    sex: "",
    civilStatus: "",
    emergencyPerson: "",
    emergencyContact: "",
    provinceState: "",
    country: "",
    city: "",
    barangay: "",
    termsAgree: false,
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
    provinceState,
    country,
    city,
    barangay,
    termsAgree,
  } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const [activeIndex, setActiveIndex] = useState(0)

  let sexOptions = [
    { label: "MALE", value: "M" },
    { label: "FEMALE", value: "F" },
  ]

  let civilStatusOptions = [
    { label: "SINGLE", value: "SINGLE" },
    { label: "MARRIED", value: "MARRIED" },
    { label: "WIDOW(ER)", value: "WIDOW(ER)" },
    { label: "LEGALLY SEPARATED", value: "LEGALLY SEPARATED" },
  ]

  let countryOptions = [{ label: "PHILIPPINES", value: "PHILIPPINES" }]

  let provinceOptions = [{ label: "METRO MANILA", value: "METRO MANILA" }]
  let cityOptions = [{ label: "QUEZON CITY", value: "QUEZON CITY" }]

  let barangayOptions = [{ label: "SAUYO", value: "SAUYO" }]

  useEffect(() => {
    console.log(activeIndex)
  }, [activeIndex])

  return (
    <>
      <Card
        title="Patient Registration"
        className="p-col-12 p-lg-offset-4 p-lg-4"
      >
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          className="p-mb-5"
        />
        {activeIndex === 0 && (
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText id="inputtext" />
                <label htmlFor="inputtext">First Name</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText id="inputtext" />
                <label htmlFor="inputtext">Middle Name</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText id="inputtext" />
                <label htmlFor="inputtext">Last Name</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText id="inputtext" />
                <label htmlFor="inputtext">Email</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText id="inputtext" />
                <label htmlFor="inputtext">Mobile Number</label>
              </span>
            </div>
            <div className="p-col-12">
              <Button
                label="Next"
                className="p-button-primary"
                onClick={() => setActiveIndex(1)}
              />
            </div>
          </div>
        )}

        {activeIndex === 1 && (
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12 p-d-none p-d-md-block">
              <span className="p-float-label">
                <Calendar
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => onChange(e)}
                  monthNavigator
                  yearNavigator
                  showIcon
                  mask="99/99/9999"
                  yearRange="1930:2021"
                  showButtonBar
                />
                <label htmlFor="birthDate">Birthdate</label>
              </span>
            </div>
            <div className="p-field p-col-12 p-d-md-none">
              <span className="p-float-label">
                <Calendar
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => onChange(e)}
                  monthNavigator
                  yearNavigator
                  showIcon
                  mask="99/99/9999"
                  yearRange="1930:2021"
                  showButtonBar
                  touchUI
                />
                <label htmlFor="birthDate">Birthdate</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  id="sex"
                  name="sex"
                  value={sex}
                  options={sexOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="sex">Sex</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  id="civilStatus"
                  name="civilStatus"
                  value={civilStatus}
                  options={civilStatusOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="civilStatus">Civil Status</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <h5>Emergency Contact:</h5>
              <span className="p-float-label p-mt-5">
                <InputText id="emergencyPerson" name="emergencyPerson" />
                <label htmlFor="emergencyPerson">Contact Person</label>
              </span>
              <span className="p-float-label p-mt-5">
                <InputText id="emergencyContact" />
                <label htmlFor="emergencyContact">Contact Number</label>
              </span>
            </div>
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
                <InputText id="houseBldgStreet" />
                <label htmlFor="houseBldgStreet">
                  House # / Building / Street
                </label>
              </span>
            </div>

            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  id="country"
                  name="country"
                  value={country}
                  options={countryOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="country">Country</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  id="provinceState"
                  name="provinceState"
                  value={provinceState}
                  options={provinceOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="provinceState">Province/State</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  id="city"
                  name="city"
                  value={city}
                  options={cityOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="city">City</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  id="barangay"
                  name="barangay"
                  value={barangay}
                  options={barangayOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="barangay">Barangay</label>
              </span>
            </div>
            <div className="p-field p-col-12">
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
                  Click the checkbox to agree to our Terms &amp; Conditions
                </label>
              </div>
            </div>
            <div className="p-col-12 p-d-flex p-flex-row p-jc-between">
              <Button
                label="Back"
                className="p-mx-2 p-button-outlined p-button-secondary"
                onClick={() => setActiveIndex(1)}
              />
              <Button label="Submit" className="p-mx-2 p-button-primary" />
            </div>
          </div>
        )}

        <Divider />
        <div className="p-d-flex p-jc-center p-flex-column">
          <h3 className="p-text-center">Already have an account?</h3>
          <Button
            label="Click here to Login"
            className="p-button-link"
            onClick={() => history.push("/login")}
          />
        </div>
      </Card>
    </>
  )
}

export default RegisterBox
