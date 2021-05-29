import React, { useState } from "react"
import { Steps } from "primereact/steps"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { Card } from 'primereact/card';


const Booking = ({ history }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scheduleDate, setScheduleDate] = useState()
  const items = [
    { label: "Health Declaration" },
    { label: "Choose Schedule" },
    { label: "Review and Confirm" },
  ]
  let healthFacilityOptions = [
    {
      label: "All",
      value: "All",
    },{
      label: "Location1",
      value: "Location1",
    },
    {
      label: "Location2",
      value: "Location2",
    },
  ]
  return (
    <>
      <div className=" p-lg-6 p-lg-offset-3">
        <h2>Book a Schedule</h2>
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          className="p-mb-5"
        />
        <Divider />
        {activeIndex === 0 && (
          <>
            <table border="1">
              <thead>
                <tr>
                  <th>Question</th>
                  <th colspan="3"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Have you or any family member/s have been diagnosed with or
                    tested positive for COVID-19 in the past three (3) months?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    Do you or did you have the following symptoms in the past 14
                    days?{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fever of greater than 37
                    degrees?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you have any flu-like
                    symptom such as cough or chills in the past 14 days?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you experience
                    shortness of breath or breathing difficulty?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Headache, muscle, or
                    body ache?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Weakenss or fatigue?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are you experiencing
                    diarrhea?{" "}
                  </td>
                  <td>
                    <input type="radio" />
                    Not sure
                  </td>
                  <td>
                    <input type="radio" />
                    Yes
                  </td>
                  <td>
                    <input type="radio" />
                    No
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="p-d-flex p-jc-center p-flex-column p-mt-3">
              <Button
                label="Next"
                className="p-button-sm p-button-primary"
                onClick={() => setActiveIndex(1)}
              />
            </div>
          </>
        )}
        {activeIndex === 1 && (<>
          <div className="p-fluid p-grid">
            <div className="p-field p-col-6">
              <span className="p-float-label">
                <Calendar
                  id="scheduleDate"
                  name="scheduleDate"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  showIcon
                  mask="99/99/9999"
                  showButtonBar
                />
                <label htmlFor="scheduleDate">Select Schedule</label>
              </span>
            </div>
            
            <div className="p-field p-col-6">
              <span className="p-float-label">
                <Dropdown
                  id="healthFacility"
                  name="healthFacility"
                  value=""
                  options={healthFacilityOptions}
                  optionLabel="label"
                  optionValue="value"
                />
                <label htmlFor="healthFacility">Location</label>
              </span>
            </div>
          </div>
          <Divider align="center"><h3>Results</h3></Divider>
          <Card className="p-col-12 p-shadow-3 p-my-2" title="Kaligayahan Activity Center" subTitle="LGU - Quezon City">
            <div className="p-grid">
              <div className="p-col-12 ">
                <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
                <p><b>Timeslot: </b>11:00AM - 12:00 PM</p>
                <p><b>Available Slots: </b>100</p>
              </div>
              <div className="p-col-12 p-pl-0 p-ml-0">
                <Button
                  label="Book this schedule"
                  onClick={ () => setActiveIndex(2) }
                  icon="pi pi-check"
                  className="p-ml-3 p-button-sm p-button-primary"
                />
              </div>
            </div>
          </Card>
          <Card className="p-col-12 p-shadow-3 p-my-2" title="Kaligayahan Activity Center" subTitle="LGU - Quezon City">
            <div className="p-grid">
              <div className="p-col-12 ">
                <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
                <p><b>Timeslot: </b>12:00PM - 1:00 PM</p>
                <p><b>Available Slots: </b>17</p>
              </div>
              <div className="p-col-12 p-pl-0 p-ml-0">
                <Button
                  label="Book this schedule"
                  onClick={ () => setActiveIndex(2) }
                  icon="pi pi-check"
                  className="p-ml-3 p-button-sm p-button-primary"
                />
              </div>
            </div>
          </Card>
          <Card className="p-col-12 p-shadow-3 p-my-2" title="Kaligayahan Activity Center" subTitle="LGU - Quezon City">
            <div className="p-grid">
              <div className="p-col-12 ">
                <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
                <p><b>Timeslot: </b>1:00PM - 2:00 PM</p>
                <p><b>Available Slots: </b>52</p>
              </div>
              <div className="p-col-12 p-pl-0 p-ml-0">
                <Button
                  label="Book this schedule"
                  onClick={ () => setActiveIndex(2) }
                  icon="pi pi-check"
                  className="p-ml-3 p-button-sm p-button-primary"
                />
              </div>
            </div>
          </Card>
          <Card className="p-col-12 p-shadow-3 p-my-2" title="Kaligayahan Activity Center" subTitle="LGU - Quezon City">
            <div className="p-grid">
              <div className="p-col-12 ">
                <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
                <p><b>Timeslot: </b>2:00PM - 3:00 PM</p>
                <p><b>Available Slots: </b>3</p>
              </div>
              <div className="p-col-12 p-pl-0 p-ml-0">
                <Button
                  label="Book this schedule"
                  onClick={ () => setActiveIndex(2) }
                  icon="pi pi-check"
                  className="p-ml-3 p-button-sm p-button-primary"
                />
              </div>
            </div>
          </Card>
        </>)}
        {activeIndex === 2 && (<>
          <Divider align="center"><h3>Review and Confirm Booking</h3></Divider>
          <div className="p-grid">
            <div className="p-col-12 ">
              <Card className="p-col-12 p-shadow-3 p-my-2" title="Kaligayahan Activity Center" subTitle="LGU - Quezon City">
                  <div className="p-grid">
                    <div className="p-col-12 ">
                      <p><b>Site: </b> LGU Quezon City - Kaligayahan Activity Center</p>
                      <p><b>Timeslot: </b>12:00PM - 1:00 PM</p>

                      <h5>Reminders</h5>
                      <ul>
                        <li>Please be at the health facility fifteen (15) minutes before the booked schedule</li>
                        <li>Bring a printed digital copy of your QR Code</li>
                        <li>Provide one (1) valid government ID for identity verification</li>
                        <li>Provide proof of comorbidity such as medical records or prescriptions</li>
                      </ul>
                    </div>
                  </div>
                </Card>
            </div>
          </div>
          
          <div className="p-d-flex p-flex-row p-ai-stretch p-jc-evenly">
            
            <Button
              label="Choose another schedule"
              icon="pi pi-arrow-left"
              className="p-as-stretch p-button-sm p-button-secondary p-button-lg p-button-outlined"
              onClick={ () => setActiveIndex(1)}
            />
            <Button
              label="Finalize this booking"
              icon="pi pi-save"
              className="p-as-stretch p-button-sm p-button-success p-button-lg"
              onClick={ () => history.push("/dashboard/schedules")}
            />
          </div>
        </>)}
      </div>
    </>
  )
}

export default Booking
