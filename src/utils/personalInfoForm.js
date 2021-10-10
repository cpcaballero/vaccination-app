import covidClassificationOptions from "../utils/covidClassifications"
import civilStatusOptions from "../utils/civilStatusClassifications"


const personalInfoForm = (props) => {
  console.log(props)
  let sexOptions = [
    { label: "MALE", value: "M" },
    { label: "FEMALE", value: "F" },
  ]
  return [
  {
    nameId: "birthDate",
    value: props.birthDate,
    type: "date",
    label: "Birth Date",
    required: true,
  },
  {
    nameId: "sex",
    value: props.sex,
    type: "dropdown",
    label: "Sex",
    required: true,
    options: sexOptions
  },
  {
    nameId: "civilStatus",
    value: props.civilStatus,
    type: "dropdown",
    label: "Civil Status",
    required: true,
    options: civilStatusOptions
  },
  {
    nameId: "covidClassification",
    value: props.covidClassification,
    type: "dropdown",
    label: "Covid 19 Classification",
    required: true,
    options: covidClassificationOptions
  },
  {
    nameId: "emergencyPerson",
    value: props.emergencyPerson,
    type: "text",
    label: "Emergency Contact Person",
    required: true,
  },
  {
    nameId: "emergencyContact",
    value: props.emergencyContact,
    type: "text",
    label: "Emergency Contact Number",
    required: true,
  }
]}
export default personalInfoForm