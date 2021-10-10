import React, { useState, useEffect, useRef } from "react"
import { Steps } from "primereact/steps"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { Card } from "primereact/card"
import { InputSwitch } from "primereact/inputswitch"
import { RadioButton } from "primereact/radiobutton"
import { Checkbox } from "primereact/checkbox"
import { DataTable } from "primereact/datatable"
import { ColumnGroup } from "primereact/columngroup"
import { Row } from "primereact/row"
import { Column } from "primereact/column"
import { Toast } from 'primereact/toast';
import "./style.css"

import { useAuthDispatch, useAuthState } from "../context/auth"
import { 
  getLocations, 
  getSchedules, 
  getVaccinee, 
  confirmBooking, 
  saveBooking 
} from "../context/auth/actions"

const Booking = ({ history }) => {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const [scheduleDate, setScheduleDate] = useState()
  const [bookedSchedule, setBookedSchedule] = useState()
  const [displayedLocation, setDisplayedLocation] = useState()
  const [displayedSchedules, setDisplayedSchedules] = useState()
  const { locations, schedules, vaccinee, bookingConfirmed, bookingLoading } = useAuthState() // choices
  const [language, toggleLanguage] = useState(true) // true = English, false = Filipino
  const [location, setLocation] = useState() // answer
  const [healthFacilityOptions, setHealthFacilityOptions] = useState([]) // dropdown
  const [healthDecAnswers, setHealthDecAnswers] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false,
    q8: false,
    q9: false,
    q10: false,
    q11: false,
    q12: false,
    q13: false,
    q14: false,
    q15: false,
    q16: false,
    q17: false,
    q18: false,
    q19: false,
    q20: false,
    q21: false,
    q22: false,
    q23: false,
  })
  const dispatch = useAuthDispatch()
  const {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    q12,
    q13,
    q14,
    q15,
    q16,
    q17,
    q18,
    q19,
    q20,
    q21,
    q22,
    q23,
  } = healthDecAnswers

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Question" />
        <Column header="Answer" colSpan={2} />
      </Row>
    </ColumnGroup>
  )

  const items = [
    { label: "Health Declaration" },
    { label: "Choose Schedule" },
    { label: "Review and Confirm" },
  ]

  useEffect(() => {
    getLocations(dispatch)
    getSchedules(dispatch)
    getVaccinee(dispatch)
  }, [])

  useEffect(() => {
    if (locations !== null) {
      setHealthFacilityOptions(
        locations.map((item) => {
          return {
            label: item.locationName,
            value: item._id,
          }
        }),
      )
    }
  }, [locations])


  const getFormattedDate = (date) => {
    date = new Date(date)
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  }

  const updateDisplayedSchedules = () => {

    if(location === undefined || scheduleDate === undefined || scheduleDate === null) {
      toast.current.show({
        severity: 'warn',
        summary: 'Incomplete fields',
        detail: 'Choose a location and date to show schedules',
        sticky: false,
        life: 5000
      });
    } else {
      let filteredLocation = locations.filter((item) => {
        if (item._id === location) {
          return item 
        }
      })
      let filteredSchedules = schedules.filter((item) => {
        let inputDate = getFormattedDate(scheduleDate);
        if(item.location._id === location && item.scheduleDate === inputDate ) {
          return item
        }
      })
      setDisplayedSchedules(filteredSchedules)
      setDisplayedLocation(...filteredLocation)
    }
  }

  const handleBooking = async (scheduleId) => {
    //action to scheduleID, vaccineeId, 
    dispatch({type: "BOOKING_LOADING"})
    let res = await confirmBooking(
      dispatch,
      {
        scheduleId,
        vaccineeId : vaccinee._id
      }
    );
    if(!res.success){
      if(toast.current){
        toast.current.show({
          severity: 'error',
          summary: 'Schedule Unavailable',
          detail: 'The schedule you are trying to book might be closed already. Please select a different schedule.',
          sticky: false,
          life: 5000
        });
      }
    } else {
      setBookedSchedule(
        schedules.find( 
          schedule => schedule._id === scheduleId
        )
      );
      setActiveIndex(2);
    }
  }

  const finalizeBooking = async () => {
    dispatch({type: "BOOKING_LOADING"})
    let res = await confirmBooking(
      dispatch,
      {
        scheduleId: bookedSchedule._id,
        vaccineeId : vaccinee._id
      }
    );
    if(!res.success){
      if(toast.current){
        toast.current.show({
          severity: 'error',
          summary: 'Schedule Unavailable',
          detail: 'The schedule you are trying to book might be closed already. Please select a different schedule.',
          sticky: false,
          life: 5000
        });
        setActiveIndex(1);
      }
    } else {
      await saveBooking(
        dispatch, 
        {
          scheduleId: bookedSchedule._id,
          vaccineeId : vaccinee._id,
          healthDecAnswers
        }
      )
      // toast.current.show({
      //   severity: 'success',
      //   summary: 'Booking saved',
      //   detail: 'Your schedule vaccination booking was saved. Please check your email for confirmation email.',
      //   sticky: false,
      //   life: 5000
      // });
      history.push("/dashboard/schedules");
    }
  }

  return (
    <>
      <div className=" p-md-8 p-sm-12 p-md-offset-2">
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
            <h5>Language: {language ? "English" : "Filipino"}</h5>
            <InputSwitch
              checked={language}
              onChange={(e) => toggleLanguage(e.value)}
            />
            {language && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th colspan="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Have you or any family member/s have been diagnosed with
                        or tested positive for COVID-19 in the past three (3)
                        months?
                      </td>

                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q1: e.value,
                            })
                          }
                          checked={q1}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q1: e.value,
                            })
                          }
                          checked={!q1}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        Do you or did you have the following symptoms in the
                        past 14 days:{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fever of greater
                        than 37 degrees?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q2: e.value,
                            })
                          }
                          checked={q2}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q2: e.value,
                            })
                          }
                          checked={!q2}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you have any
                        flu-like symptom such as cough or chills in the past 14
                        days?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q3: e.value,
                            })
                          }
                          checked={q3}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q3: e.value,
                            })
                          }
                          checked={!q3}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you experience
                        shortness of breath or breathing difficulty?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q4: e.value,
                            })
                          }
                          checked={q4}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q4: e.value,
                            })
                          }
                          checked={!q4}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you have any
                        difficulties with your sense of taste or smell at
                        present?
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q5: e.value,
                            })
                          }
                          checked={q5}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q5: e.value,
                            })
                          }
                          checked={!q5}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Headache, muscle, or
                        body ache?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q6: e.value,
                            })
                          }
                          checked={q6}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q6: e.value,
                            })
                          }
                          checked={!q6}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Weakenss or fatigue?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q7: e.value,
                            })
                          }
                          checked={q7}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q7: e.value,
                            })
                          }
                          checked={!q7}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are you experiencing
                        diarrhea?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q8: e.value,
                            })
                          }
                          checked={q8}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q8: e.value,
                            })
                          }
                          checked={!q8}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Do you have any allergy to food, antibiotics, or any
                        medicine?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q9: e.value,
                            })
                          }
                          checked={q9}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q9: e.value,
                            })
                          }
                          checked={!q9}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Have you ever had a severe reaction to vaccines in the
                        past?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q10: e.value,
                            })
                          }
                          checked={q10}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q10: e.value,
                            })
                          }
                          checked={!q10}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Have you received any vaccine in the last 14 days?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q11: e.value,
                            })
                          }
                          checked={q11}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q11: e.value,
                            })
                          }
                          checked={!q11}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">For women: </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are you pregnant?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q12: e.value,
                            })
                          }
                          checked={q12}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q12: e.value,
                            })
                          }
                          checked={!q12}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For women who are
                        pregnant, are you in your 1st to 2nd trimester (1 to 6
                        months) of pregnancy?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q13: e.value,
                            })
                          }
                          checked={q13}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q13: e.value,
                            })
                          }
                          checked={!q13}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plans to get
                        pregnant in the next 6 months?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q14: e.value,
                            })
                          }
                          checked={q14}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q14: e.value,
                            })
                          }
                          checked={!q14}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Do you have a bleeding disorder or are you taking a
                        blood thinner? (Example of Bleeding disorder:
                        Hemophilia, Thalassemia) (Example of blood thinning
                        medications: Aspirin, Clopidogrel, Warfarin, Cilostazol){" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q15: e.value,
                            })
                          }
                          checked={q15}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q15: e.value,
                            })
                          }
                          checked={!q15}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        Do you have any of the following illness/disease?{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Autoimmune disease{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q16: e.value,
                            })
                          }
                          checked={q16}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q16: e.value,
                            })
                          }
                          checked={!q16}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HIV Diagnosis{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q17: e.value,
                            })
                          }
                          checked={q17}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q17: e.value,
                            })
                          }
                          checked={!q17}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cancer/Malignancy{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q18: e.value,
                            })
                          }
                          checked={q18}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q18: e.value,
                            })
                          }
                          checked={!q18}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transplant Patient{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q19: e.value,
                            })
                          }
                          checked={q19}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q19: e.value,
                            })
                          }
                          checked={!q19}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Under steroid
                        treatment{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q20: e.value,
                            })
                          }
                          checked={q20}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q20: e.value,
                            })
                          }
                          checked={!q20}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bed ridden, terminal
                        illness, less than 6mos prognosis{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q21: e.value,
                            })
                          }
                          checked={q21}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q21: e.value,
                            })
                          }
                          checked={!q21}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>Are you bedridden? </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q22: e.value,
                            })
                          }
                          checked={q22}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q22: e.value,
                            })
                          }
                          checked={!q22}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                    <tr>
                      <td>Are you wheelchair bound? </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q23: e.value,
                            })
                          }
                          checked={q23}
                        ></Checkbox>
                        <br />
                        Yes
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q23: e.value,
                            })
                          }
                          checked={!q23}
                        ></Checkbox>
                        <br />
                        No
                      </td>
                    </tr>
                  </tbody>
                </table>
                <small>
                  Note: If you answered yes to any of the above-mentioned
                  diseases/condition, please provide a medical clearance from
                  your physician on the day of your vaccination.
                </small>
              </>
            )}
            {!language && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Tanong</th>
                      <th colspan="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Ikaw ba o ang sinumang miyembro ng pamilya ay nasuring
                        positibo para sa COVID-19 sa nakaraang tatlong (3)
                        buwan?
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q1: e.value,
                            })
                          }
                          checked={q1}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q1: e.value,
                            })
                          }
                          checked={!q1}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        Ikaw ba ay nakararanas ng alin man sa mga sumusunod?
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- lagnat higit sa
                        37.5 C
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q2: e.value,
                            })
                          }
                          checked={q2}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q2: e.value,
                            })
                          }
                          checked={!q2}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ubo at sipon
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q3: e.value,
                            })
                          }
                          checked={q3}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q3: e.value,
                            })
                          }
                          checked={!q3}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - hirap sa paghinga
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q4: e.value,
                            })
                          }
                          checked={q4}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q4: e.value,
                            })
                          }
                          checked={!q4}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- walang panlasa at
                        pang-amoy sa kasalukuyan
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q5: e.value,
                            })
                          }
                          checked={q5}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q5: e.value,
                            })
                          }
                          checked={!q5}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- pananakit ng ulo,
                        kalamnan at katawan
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q6: e.value,
                            })
                          }
                          checked={q6}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q6: e.value,
                            })
                          }
                          checked={!q6}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- panghihina </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q7: e.value,
                            })
                          }
                          checked={q7}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q7: e.value,
                            })
                          }
                          checked={!q7}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- pagtatae </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q8: e.value,
                            })
                          }
                          checked={q8}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q8: e.value,
                            })
                          }
                          checked={!q8}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Mayroon ka bang allergy sa pagkain, antibiotic, at kahit
                        anong gamot?{" "}
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q9: e.value,
                            })
                          }
                          checked={q9}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q9: e.value,
                            })
                          }
                          checked={!q9}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Nagkaroon ka ba ng malubhang reaksyon sa kahit anong
                        bakuna o sa mga sangkap nito?
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q10: e.value,
                            })
                          }
                          checked={q10}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q10: e.value,
                            })
                          }
                          checked={!q10}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Nakatanggap ka ba ng kahit anong bakuna sa nakalipas na
                        dalawang (2) linggo?
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q11: e.value,
                            })
                          }
                          checked={q11}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q11: e.value,
                            })
                          }
                          checked={!q11}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">Para sa mga kababaihan: </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Ikaw ba ay buntis
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q12: e.value,
                            })
                          }
                          checked={q12}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q12: e.value,
                            })
                          }
                          checked={!q12}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Kung ikaw naman ay
                        buntis, nasa una (1) hanggang ika anim (6) na buwan ba
                        ang iyong pinagbubuntis?
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q13: e.value,
                            })
                          }
                          checked={q13}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q13: e.value,
                            })
                          }
                          checked={!q13}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- May planong mag
                        buntis sa susunod na 6 na buwan?
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q14: e.value,
                            })
                          }
                          checked={q14}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q14: e.value,
                            })
                          }
                          checked={!q14}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Mayroon ka bang karamdaman sa pagdurugo at kasalukuyang
                        umiinom ng pampalabnaw ng dugo? (Halimbawa ng karamdaman
                        sa pagdurogo: Hemophilia, Thalassemia) (Halimbawa ng
                        gamot na pampalabnaw: Aspirin, Clopidogrel, Warfarin,
                        Cilostazol)
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q15: e.value,
                            })
                          }
                          checked={q15}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q15: e.value,
                            })
                          }
                          checked={!q15}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        Mayroon ka ba sa mga alinmang mga sumusunod na sakit o
                        kondisyon?
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Autoimmune na
                        Sakit
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q16: e.value,
                            })
                          }
                          checked={q16}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q16: e.value,
                            })
                          }
                          checked={!q16}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- HIV </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q17: e.value,
                            })
                          }
                          checked={q17}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q17: e.value,
                            })
                          }
                          checked={!q17}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Kanser</td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q18: e.value,
                            })
                          }
                          checked={q18}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q18: e.value,
                            })
                          }
                          checked={!q18}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Transplant Patient
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q19: e.value,
                            })
                          }
                          checked={q19}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q19: e.value,
                            })
                          }
                          checked={!q19}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sumasailalim sa
                        gamutan gamit ang steroid
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q20: e.value,
                            })
                          }
                          checked={q20}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q20: e.value,
                            })
                          }
                          checked={!q20}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bed ridden, o may
                        malubhang sakit
                      </td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q21: e.value,
                            })
                          }
                          checked={q21}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q21: e.value,
                            })
                          }
                          checked={!q21}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>Ikaw ba ay bedridden</td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q22: e.value,
                            })
                          }
                          checked={q22}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q22: e.value,
                            })
                          }
                          checked={!q22}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                    <tr>
                      <td>Ikaw ba ay nakawheelchair?</td>
                      <td>
                        <Checkbox
                          value={true}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q23: e.value,
                            })
                          }
                          checked={q23}
                        ></Checkbox>
                        <br />
                        Oo
                      </td>
                      <td>
                        <Checkbox
                          value={false}
                          onChange={(e) =>
                            setHealthDecAnswers({
                              ...healthDecAnswers,
                              q23: e.value,
                            })
                          }
                          checked={!q23}
                        ></Checkbox>
                        <br />
                        Hindi
                      </td>
                    </tr>
                  </tbody>
                </table>
                <small>
                  Paalala: Kung ikaw ay sumagot ng oo sa kahit alinman sa mga
                  tanong o karamdaman, maaaring magpakita ng medical clearance
                  mula sa inyong doctor sa araw ng pagpapabakuna
                </small>
              </>
            )}

            <div className="p-d-flex p-jc-center p-ai-center p-flex-column p-my-5">
              <Button
                label="Next"
                className="p-button-sm p-button-primary p-col-6"
                onClick={() => setActiveIndex(1)}
              />
            </div>
          </>
        )}
        {activeIndex === 1 && (
          <>
            <div className="p-fluid p-grid">
              <div className="p-field p-col-12 p-sm-12 p-lg-5">
                <span className="p-float-label">
                  <Dropdown
                    id="healthFacility"
                    name="healthFacility"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    options={healthFacilityOptions}
                    optionLabel="label"
                    optionValue="value"
                  />
                  <label htmlFor="healthFacility">Location</label>
                </span>
              </div>

              <div className="p-field p-col-12 p-sm-12 p-lg-5">
                <span className="p-float-label">
                  <Calendar
                    id="scheduleDate"
                    name="scheduleDate"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    showIcon
                    minDate={ new Date()}
                    mask="99/99/9999"
                    showButtonBar
                  />
                  <label htmlFor="scheduleDate">Select Date</label>
                </span>
              </div>
              <div className="p-field p-col-12 p-sm-12 p-lg-2">
                <Button
                  label="Search"
                  onClick={() => updateDisplayedSchedules()}
                  icon="pi pi-search"
                  className="p-button-sm p-button-primary"
                />
              </div>
            </div>
            <Divider align="center">
              <h3>Results </h3>
              
            </Divider>
            <div className="p-grid p-mb-3">
              <div className="p-col-4 p-offset-2 px-2">
                { displayedLocation && (<div><b>Location: </b><br/>{displayedLocation.locationName} <br/>{displayedLocation.locationAddress}</div>)} 
              </div>
              <div className="p-col-4 p-px-2">
                { displayedLocation && scheduleDate && (<div><b>Date: </b><br/>{scheduleDate.toLocaleString('en-us', { weekday: 'long'})} <br/> {scheduleDate.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}</div>)} 
              </div>
            </div>
            
              <div className="p-fluid p-grid p-justify-start">
                {displayedLocation &&
                  displayedSchedules.map((item) => (
                    <div className="p-col-12 p-lg-4 p-md-12 p-px-3 p-py-2">
                      <div className="p-d-flex p-flex-column p-jc-between p-px-2 p-py-1 p-shadow-3">
                        <h3>{item.startTime} - {item.endTime} </h3>
                        <div div className="p-grid">
                          <div className="p-col-12 p-grid ">
                            <div className="p-col-12">
                              <b>Available Slots: </b>{item.totalSlot - item.takenSlot}
                            </div>
                          </div>
                        </div>
                        <div className="p-col-12 p-as-end ">
                          <Button
                            label="Book this schedule"
                            onClick={() => handleBooking(item._id)}
                            icon="pi pi-check"
                            className="p-button-sm p-button-success"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                { displayedLocation && displayedSchedules.length === 0 && (<p>No available slots for the chosen location and date</p>)}
              </div>
            <Toast ref={toast} position="top-center" />
          </>
        )}
        {activeIndex === 2 && (
          <>
            <Divider align="center">
              <h3>Review and Confirm Booking</h3>
            </Divider>
            <div className="p-grid">
              <div className="p-col-12 ">
                <Card
                  className="p-col-12 p-shadow-3 p-my-2"
                  title={bookedSchedule && bookedSchedule.location.locationName }
                  subTitle={bookedSchedule && bookedSchedule.location.locationAddress }
                >
                  <div className="p-grid">
                    <div className="p-col-12 ">
                      <p>
                        <b>Timeslot: </b>
                        {bookedSchedule && bookedSchedule.startTime } - {bookedSchedule && bookedSchedule.endTime }
                      </p>

                      <h5>Reminders</h5>
                      <ul>
                        <li>
                          Please be at the health facility fifteen (15) minutes
                          before the booked schedule
                        </li>
                        <li>Bring a printed digital copy of your QR Code</li>
                        <li>
                          Provide one (1) valid government ID for identity
                          verification
                        </li>
                        <li>
                          Provide proof of comorbidity such as medical records
                          or prescriptions
                        </li>
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
                onClick={() => setActiveIndex(1)}
              />
              <Button
                label="Finalize this booking"
                icon="pi pi-save"
                className="p-as-stretch p-button-sm p-button-success p-button-lg"
                onClick={() => finalizeBooking()}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Booking

// {
//   "vaccinee_id": "123",
//   ...,
//   "doses": [
//     {
//       "location_id": 1
//       "vaccine": "SinoVac",
//       ...,
//       "heathDeclaration": {
//         q1 : {
//           question: "question here",
//           answer: true
//         },
//         ...,
//         q22 : {
//           question: "question here",
//           answer: false
//         },
//       }
//     }
//   ]
// }

// {
//   "id":2,
//   "location_id":2,
//   "vaccine_id":null,
//   "sdate":"2021-07-02",
//   "stime":"08:05:00",
//   "slength":5,
//   "dow":"Friday",
//   "timeslot":"08:05AM - 08:10AM",
//   "slot_id":null,
//   "vaccinee":null,
//   "age":null,
//   "sex":null,
//   "vacant":1,
//   "schedule_id":"0",
//   "vaccine":null,
//   "location":"Clinic2",
//   "vid":null
// },
