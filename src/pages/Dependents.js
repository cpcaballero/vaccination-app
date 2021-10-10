import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import AddressComponent from "../components/AddressComponent"
import FormInput from "../components/FormInput"
import basicInfoForm from "../utils/basicInfoForm"
import personalInfoForm from "../utils/personalInfoForm"
import { Fieldset } from "primereact/fieldset"
import { InputText } from "primereact/inputtext"
import QRCode from "qrcode.react"

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Badge } from 'primereact/badge';

import  Booking  from './Booking'

const Dependents = () => {
  const [blankFields, setBlankFields] = useState([])
  const [editMode, setEditMode] = useState(true)
  const [modalView, toggleModalView] = useState(false)
  const [dependentModal, toggleDependentModal] = useState(false)

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

  const [dependentScheduleModal, toggleDependentScheduleModal] = useState(false)
const [dependentBooking, toggleDependentBooking] = useState(false)

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const createBooking = () => "/dashboard/schedules/book"
  return (
    <div>
      <h2>Dependents</h2>
      <Button
        label="Add"
        icon="pi pi-save"
        className="p-my-3 p-button-sm p-button-primary"
        onClick={ () => toggleModalView(true)}
      />
      <DataTable value={[
        {
          vaccineId: "1726382",
          name: "Angelita Dazo Pelimer",
          category: "A3. ADULT WITH COMORBIDITY",
          actions:  (<><a href="#" onClick={ () => toggleDependentScheduleModal(true)}>View Schedule</a><br/><a href="#" onClick={ () => toggleDependentModal(true)}>View QR Code</a><br/></>) //<a href="#">View Health Declaration</a>
        }
      ]} emptyMessage="No Records Found">
        <Column header="Vaccinee ID" field="vaccineId"></Column>
        <Column header="Name" field="name"></Column>
        <Column header="Category" field="category"></Column>
        <Column header="Actions" field="actions"></Column>
      </DataTable>

      <Dialog
        visible={modalView}
        onHide={() => toggleModalView(false)}
        header="Add New Dependent"
      >
        <div className=" p-lg-6 p-lg-offset-3">
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
                label="Save"
                icon="pi pi-save"
                className="p-my-3 p-button-lg p-button-primary"
                onClick={() => setEditMode(!editMode)}
              />
            </div>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dependentModal}
        onHide={() => toggleDependentModal(false)}
        header="Dependent QR Code for Scanning"
      >
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
          <QRCode
            value="1726382"
            className="p-as-center p-text-center"
            size={256}
            includeMargin={false}
          />
          <h4>
            Angelita Dazo Pelimer
          </h4>
          <small>ID No: 1726382</small>
        </div>
      </Dialog>

      <Dialog
        visible={dependentScheduleModal}
        style={{width: '100vw'}}
        onHide={() => toggleDependentScheduleModal(false)}
        header="View Dependent Schedule"
      >
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
          <div className=" p-lg-8 p-lg-offset-2">
      <h2>
        My Schedules{" "}
        <Button
          label="Book a Schedule"
          icon="pi pi-pencil"
          className="p-ml-3 p-button-sm p-button-primary"
          onClick={ () => toggleDependentBooking(true)}
        />
      </h2>
      <Divider />
      
      <div className="p-fluid p-grid p-mt-3">
        <>No schedules booked yet.</>
        {/* <Card className="p-col-12" title="First Dose" subTitle={<>Status: <Badge value="Administered" severity="success"></Badge></>}>
          <div className="p-grid">
            <div className="p-col-12 p-lg-6">
              <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
              <p><b>Date Time Reserved: </b>May 28, 2021 11:00AM - May 28, 2021 12:00 PM</p>
              <p><b>Administered On: </b> May 28, 2021 1:00 PM</p>
              
            </div>
            <div className="p-col-12 p-lg-6">
              <p><b>Vaccine Name: </b> Sinovac</p>
              <p><b>Batch Id: </b> B202104047</p>
              <p><b>Dosage: </b> 0.5 mL</p>
            </div>
            <div className="p-col-3">
              <Button
                label="Report Adverse Effects"
                icon="pi pi-exclamation-circle"
                className="p-ml-3 p-button-sm p-button-danger p-button-outlined"
              />
            </div>
          </div>
        </Card>
        <Divider />
        <Card className="p-col-12" title="Second Dose" subTitle={<>Status: <Badge value="Schedule Confirmed" severity="info"></Badge></>}>
          <div className="p-grid">
            <div className="p-col-12 ">
              <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
              <p><b>Date Time Reserved: </b>June 25, 2021 11:00AM - June 25, 2021 12:00 PM</p>
            </div>
            <div className="p-col-3">
              <Button
                label="Reschedule"
                icon="pi pi-calendar"
                className="p-ml-3 p-button-sm p-button-warning p-button-outlined"
              />
            </div>
          </div>
        </Card> */}
      </div>
    </div>  
        </div>
      </Dialog>



    <Dialog
        visible={dependentBooking}
        style={{width: '100vw'}}
        onHide={() => toggleDependentBooking(false)}
        header="Add Dependent Vaccination Booking"
      >
        
        
      <Booking />
        
    </Dialog>

      
    </div>
  )
}

export default Dependents
