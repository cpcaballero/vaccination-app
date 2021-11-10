import React, { useState, useEffect } from 'react'
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
import { Steps } from "primereact/steps"

import  Booking  from './Booking'
import { useAuthDispatch, useAuthState } from "../context/auth";
import { createUser, insertDependent } from '../context/auth/actions';


const Dependents = () => {
  const [blankFields, setBlankFields] = useState([])
  const [editMode, setEditMode] = useState(true)
  const [modalView, toggleModalView] = useState(false)
  const { user } = useAuthState();
  const [dependentModal, toggleDependentModal] = useState(false)
  const dispatch = useAuthDispatch();
  

  const items = [
    { label: "Basic" },
    { label: "Personal" },
    { label: "Address" },
  ]

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

  const [activeIndex, setActiveIndex] = useState(0)

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

  useEffect( () => {
    setFormData((prevData) => {
      return { ...prevData, 
        "mobileNumber": user.mobileNumber, 
        "emailAddress": user.emailAddress,
        "emergencyContact": user.mobileNumber,
        "emergencyPerson": `${user.firstName} ${user.middleName[0]}. ${user.lastName}` 
      }
    })
    setActiveIndex(0);

  }, [user]);

  const handleSubmitDependent = async () => {
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
        await insertDependent(dispatch, {userId: user._id, dependentId: postToServer._id})
        
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
        
        
        // history.push("/login", {
        //   state: { confirmRegister: "Registration success. You may now login"}
        // })
        // }).then(jb_respose => {
        //   console.log(jb_respose)
        
      }
    }
  }



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
        resizable={false}
        draggable={false}
        header="Add New Dependent"
        style={{width: '30vw'}}
        contentStyle={{maxHeight: '100%'}}
        breakpoints={{'1200px': '75vw', '768px': '100vw'}}
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
        <div className=" p-lg-12">
          {activeIndex === 0 && (  
            <div className="p-fluid p-grid ">
              {basicFormObject.map((item) => (
                <>
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
                    helpText={
                      ["mobileNumber", "emailAddress"].includes(item.nameId)  
                        ? "You may leave account holder's info as default value" 
                        : "" 
                    }
                  />
                </>
                
              ))}
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
          
            <div className="p-fluid p-grid ">
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
                  helpText={
                    ["emergencyPerson", "emergencyContact"].includes(item.nameId)  
                      ? "You may leave account holder's info as default value" 
                      : ""
                  }
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
          
            <div className="p-fluid p-grid ">
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

              <div className="p-col-12 p-d-flex p-flex-row p-jc-between">
                <Button
                  label="Back"
                  className="p-mx-2 p-button-outlined p-button-secondary"
                  onClick={() => setActiveIndex(1)}
                />
                <Button
                  label="Submit"
                  className="p-mx-2 p-button-primary"
                  onClick={() => handleSubmitDependent()}
                />
              </div>
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
