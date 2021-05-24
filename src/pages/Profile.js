import React, { useState } from "react"
import { Button } from "primereact/button"
// import { Divider } from "primereact/divider"
import { Fieldset } from "primereact/fieldset"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
// import { Checkbox } from "primereact/checkbox"

const Profile = () => {
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
    covidClassification: ""
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
    covidClassification
  } = formData
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

  let covidClassificationOptions = [
    {
      label: "A1. Health Care Workers",
      value: "A1. Health Care Workers",
    },
    { label: "A2. Senior Citizens", value: "A2. Senior Citizens" },
    {
      label: "A3. Adult with Comorbidity",
      value: "A3. Adult with Comorbidity",
    },
    {
      label: "A4. Frontline Personnel in Essential Sector",
      value: "A4. Frontline Personnel in Essential Sector",
    },
    { label: "A5. Poor Population", value: "A5. Poor Population" },
    {
      label: "B1. Teachers and Social Workers",
      value: "B1. Teachers and Social Workers",
    },
    {
      label: "B2. Other Government Workers",
      value: "B2. Other Government Workers",
    },
    {
      label: "B3. Other Essential Workers",
      value: "B3. Other Essential Workers",
    },
    {
      label: "B4. Socio-demographic groups",
      value: "B4. Socio-demographic groups",
    },
    {
      label: "B5. Overseas FIlipino Workers",
      value: "B5. Overseas FIlipino Workers",
    },
    {
      label: "B6. Other Remaining Workforce",
      value: "B6. Other Remaining Workforce",
    },
    {
      label: "C. Rest of the Filipino population",
      value: "C. Rest of the Filipino population",
    },
  ]

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <>
      <div className=" p-lg-6 p-lg-offset-3">
        <h2>My Profile</h2>
        <Fieldset legend="Basic">
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText disabled id="inputtext" value="Carlos" />
                <label htmlFor="inputtext">First Name</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText disabled id="inputtext" value="Pelimer" />
                <label htmlFor="inputtext">Middle Name</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText disabled id="inputtext" value="Caballero" />
                <label htmlFor="inputtext">Last Name</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText
                  disabled
                  id="inputtext"
                  value="carlospcaballero@outlook.com"
                />
                <label htmlFor="inputtext">Email</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText disabled id="inputtext" value="09175402233" />
                <label htmlFor="inputtext">Mobile Number</label>
              </span>
            </div>
          </div>
        </Fieldset>
        <Fieldset className="p-mt-3" legend="Personal">
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12 p-d-none p-d-md-block">
              <span className="p-float-label">
                <Calendar
                  disabled
                  id="birthDate"
                  name="birthDate"
                  value={new Date("1992/02/20")}
                  // onChange={(e) => onChange(e)}
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
                  disabled
                  id="birthDate"
                  name="birthDate"
                  value={ new Date("1992/02/20")}
                  // onChange={(e) => onChange(e)}
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
                  disabled
                  id="sex"
                  name="sex"
                  value="M"
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
                  disabled
                  id="civilStatus"
                  name="civilStatus"
                  value="SINGLE"
                  options={civilStatusOptions}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="civilStatus">Civil Status</label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  disabled
                  id="covidClassification"
                  name="covidClassification"
                  value="A3. Adult with Comorbidity"
                  options={covidClassificationOptions}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="covidClassification">
                  COVID-19 Classification
                </label>
              </span>
            </div>
            <div className="p-field p-col-12">
              <h5>Emergency Contact:</h5>
              <span className="p-float-label p-mt-5">
                <InputText
                  disabled
                  id="emergencyPerson"
                  name="emergencyPerson"
                  value="Angelita Pelimer"
                />
                <label htmlFor="emergencyPerson">Contact Person</label>
              </span>
              <span className="p-float-label p-mt-5">
                <InputText disabled id="emergencyContact" value="09163870258" />
                <label htmlFor="emergencyContact">Contact Number</label>
              </span>
            </div>
          </div>
        </Fieldset>
        <Fieldset legend="Address">
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText id="houseBldgStreet" value="#35 Don Julio Gregorio St." disabled />
                <label htmlFor="houseBldgStreet">
                  House # / Building / Street
                </label>
              </span>
            </div>

            <div className="p-field p-col-12">
              <span className="p-float-label">
                <Dropdown
                  disabled
                  id="country"
                  name="country"
                  value="PHILIPPINES"
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
                  disabled
                  id="provinceState"
                  name="provinceState"
                  value="METRO MANILA"
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
                  disabled
                  id="city"
                  name="city"
                  value="QUEZON CITY"
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
                  disabled
                  id="barangay"
                  name="barangay"
                  value="SAUYO"
                  options={barangayOptions}
                  onChange={onChange}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="barangay">Barangay</label>
              </span>
            </div>
          </div>
        </Fieldset>
        <Fieldset legend="Medical"></Fieldset>
      </div>
    </>
  )
}

export default Profile
