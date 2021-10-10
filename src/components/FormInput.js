import React from "react"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Calendar } from "primereact/calendar"

const FormInput = ({
  type,
  isEditable = true,
  label,
  onChange,
  nameId,
  value,
  required,
  ...rest
}) => {
  switch (type) {
    case "text":
      return (
        <div className="p-field p-col-12">
          <span className="p-float-label">
            <InputText
              id={nameId}
              name={nameId}
              value={value}
              onChange={(e) => onChange(e)}
              {...rest}
            />
            <label htmlFor={nameId}>{required  && "*"}{label}</label>
          </span>
        </div>
      )
      break
    case "password":
      return (
        <div className="p-field p-col-12">
          <span className="p-float-label">
            <Password
              value={value}
              id={nameId}
              name={nameId}
              onChange={(e) => onChange(e)}
              toggleMask={true}
              {...rest}
            />

            <label htmlFor={nameId}>{required  && "*"}{label}</label>
          </span>
        </div>
      )
      break
    case "date":
      console.log(value)
      return (
        <>
          <div className="p-field p-col-12 p-d-none p-d-md-block">
            <span className="p-float-label">
              <Calendar
                id={nameId}
                name={nameId}
                value={value}
                onChange={(e) => onChange(e)}
                monthNavigator
                yearNavigator
                showIcon
                mask="99/99/9999"
                yearRange="1900:2021"
                showButtonBar
                {...rest}
              />
              <label htmlFor={nameId}>{label}</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-d-md-none">
            <span className="p-float-label">
              <Calendar
                id={nameId}
                name={nameId}
                value={value}
                onChange={(e) => onChange(e)}
                monthNavigator
                yearNavigator
                showIcon
                mask="99/99/9999"
                yearRange="1900:2021"
                showButtonBar
                touchUI
                {...rest}
              />
              <label htmlFor={nameId}>{label}</label>
            </span>
          </div>
        </>
      )
      break
    case "dropdown":
      return (
        <>
          <div className="p-field p-col-12">
            <span className="p-float-label">
              <Dropdown
                id={nameId}
                name={nameId}
                value={value}
                optionLabel="label"
                optionValue="value"
                onChange={(e) => onChange(e)}
                {...rest}
              />
              <label htmlFor={nameId}>{label}</label>
            </span>
          </div>
        </>
      )
  }
}

export default FormInput
