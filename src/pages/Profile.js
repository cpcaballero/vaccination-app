import React, { useState, useEffect } from "react"
import { Button } from "primereact/button"
// import { Divider } from "primereact/divider"
import { Fieldset } from "primereact/fieldset"
// import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
// import { Dropdown } from "primereact/dropdown"
// import { Checkbox } from "primereact/checkbox"
import { getVaccinee } from "../context/auth/actions"
import { useAuthDispatch, useAuthState } from "../context/auth"

import AddressComponent from "../components/AddressComponent"
import FormInput from "../components/FormInput"
import basicInfoForm from "../utils/basicInfoForm"
import personalInfoForm from "../utils/personalInfoForm"

const Profile = () => {
  const [editMode, setEditMode] = useState(false)
  const dispatch = useAuthDispatch()
  const { vaccinee } = useAuthState()
  const [blankFields, setBlankFields] = useState([])

  useEffect(() => {
    console.log("useeffect getvaccinee")
    getVaccinee(dispatch)
  }, [dispatch])

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    mobileNumber: "",
    emailAddress: "",
    sex: "",
    civilStatus: "",
    covidClassification: "",
    emergencyContact: "",
    emergencyPerson: "",
    houseBldgStreet: "",
    barangay: "",
    cityMunicipality: "",
    provinceState: "",
    zipPostal: "",
    region: "",
    weight: "",
    height: "",
  })

  const {
    firstName,
    middleName,
    lastName,
    birthDate,
    mobileNumber,
    emailAddress,
    sex,
    civilStatus,
    covidClassification,
    emergencyContact,
    emergencyPerson,
    houseBldgStreet,
    barangay,
    cityMunicipality,
    provinceState,
    zipPostal,
    region,
    weight,
    height,
  } = formData

  useEffect(() => {
    if (vaccinee !== null)
      setFormData({
        ...vaccinee,
        birthDate: new Date(vaccinee.birthDate),
      })
  }, [vaccinee])

  let basicFormObject = basicInfoForm({
    firstName,
    middleName,
    lastName,
    mobileNumber,
    emailAddress,
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
  console.log(basicFormObject)
  console.log(personalFormObject)
  return (
    <>
      <div className=" p-lg-6 p-lg-offset-3">
        <h2>
          My Profile{" "}
          <Button
            label={editMode ? "Update" : "Edit"}
            icon={editMode ? "pi pi-save" : "pi pi-pencil"}
            className={`p-ml-3 p-button-sm ${
              editMode
                ? "p-button-primary"
                : "p-button-secondary p-button-outlined"
            }`}
            onClick={() => setEditMode(!editMode)}
          />
        </h2>
        <Fieldset className="p-mt-3" legend="Basic">
          <div className="p-fluid p-grid p-mt-3">
            {basicFormObject.map((item) => (
              <FormInput
                {...item}
                type={item.type}
                nameId={item.nameId}
                value={item.value}
                label={item.label}
                onChange={(e) => onChange(e)}
                className={
                  blankFields.includes(item.nameId) && item.required
                    ? "p-invalid"
                    : ""
                }
                disabled={!editMode}
              />
            ))}
          </div>
        </Fieldset>
        <Fieldset className="p-mt-3" legend="Personal">
          <div className="p-fluid p-grid p-mt-3">
            {personalFormObject.map((item) => (
              <FormInput
                {...item}
                type={item.type}
                nameId={item.nameId}
                value={item.value}
                label={item.label}
                onChange={(e) => onChange(e)}
                className={
                  blankFields.includes(item.nameId) && item.required
                    ? "p-invalid"
                    : ""
                }
                disabled={!editMode}
              />
            ))}
          </div>
        </Fieldset>
        <Fieldset className="p-mt-3" legend="Address">
          <div className="p-fluid p-grid p-mt-3">
            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText
                  id="houseBldgStreet"
                  name="houseBldgStreet"
                  value={houseBldgStreet}
                  onChange={(e) => onChange(e)}
                  className={
                    blankFields.includes("houseBldgStreet") ? "p-invalid" : ""
                  }
                  disabled={!editMode}
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
              disabled={!editMode}
            />

            <div className="p-field p-col-12">
              <span className="p-float-label">
                <InputText
                  id="zipPostal"
                  name="zipPostal"
                  value={zipPostal}
                  onChange={(e) => onChange(e)}
                  className={
                    blankFields.includes("zipPostal") ? "p-invalid" : ""
                  }
                  disabled={!editMode}
                />
                <label htmlFor="zipPostal">Zip / Postal Code</label>
              </span>
            </div>
          </div>
        </Fieldset>
        <Fieldset className="p-mt-3" legend="Medical">
          <div className="p-fluid p-grid p-mt-3">
            <div className="p-field p-col">
              <div className="p-inputgroup">
                <span className="p-float-label">
                  <InputText disabled={!editMode} id="inputtext" value="0" />
                  <span className="p-inputgroup-addon">kg</span>
                  <label htmlFor="inputtext">Weight (kg)</label>
                </span>
              </div>
            </div>
            <div className="p-field p-col">
              <div className="p-inputgroup">
                <span className="p-float-label">
                  <InputText disabled={!editMode} id="inputtext" value="0" />
                  <span className="p-inputgroup-addon">cm</span>
                  <label htmlFor="inputtext">Height (cm)</label>
                </span>
              </div>
            </div>
          </div>
        </Fieldset>
        {editMode && (
          <div className="p-d-flex p-flex-column p-ai-stretch">
            <Button
              label="Update"
              icon="pi pi-save"
              className="p-my-3 p-button-lg p-button-primary"
              onClick={() => setEditMode(!editMode)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
