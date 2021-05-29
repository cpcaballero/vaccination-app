import React, {useState} from "react"
import {Button} from 'primereact/button'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Badge } from 'primereact/badge';

const Schedules = ({history}) => {
  
  let healthFacilityOptions = [
    {
      label: "Location1",
      value: "Location1",
    }
  ]

  const createBooking = () => history.push("/dashboard/schedules/book")
  return (<>
    <div className=" p-lg-6 p-lg-offset-3">
      <h2>
        My Schedules{" "}
        <Button
          label="Book a Schedule"
          icon="pi pi-pencil"
          className="p-ml-3 p-button-sm p-button-primary"
          onClick={ () => createBooking()}
        />
      </h2>
      <Divider />
      <h3> Manufacturer: Sinovac </h3>
      <div className="p-fluid p-grid p-mt-3">
        <Card className="p-col-12" title="First Dose" subTitle={<>Status: <Badge value="Administered" severity="success"></Badge></>}>
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
        </Card>
      </div>
    </div>
    
    
  </>)
}

export default Schedules
