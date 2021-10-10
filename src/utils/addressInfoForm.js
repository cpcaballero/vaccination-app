import refBrgy from "../utils/refbrgy"
import refCityMun from "../utils/refcitymun"
import refProvince from "../utils/refprovince"
import refRegion from "../utils/refregion"
import refCountry from "../utils/refcountry"

const addressInfoForm = (props) => {
  let sexOptions = [
    { label: "MALE", value: "M" },
    { label: "FEMALE", value: "F" },
  ]
  return [
  {
    nameId: "houseBldgStreet",
    value: props.houseBldgStreet,
    type: "text",
    label: "House # / Building / Street",
    required: true,
  },
  {
    nameId: "country",
    value: props.country,
    type: "dropdown",
    label: "Country",
    required: true,
    options: () => {
      refCountry
        .map((item) => {
          return {
            label: item.name,
            value: item.code,
          }
        })
        .sort((a, b) => (a.label > b.label ? 1 : -1))
    }
  },
  {
    nameId: "provinceState",
    value: props.provinceState,
    type: "dropdown",
    label: "Province/State",
    required: true,
    options: () => {
      refProvince.RECORDS.map((item) => {
        return {
          label: item.provDesc,
          value: item.provCode,
        }
      }).sort((a, b) => (a.label > b.label ? 1 : -1))
    }
  },
  {
    nameId: "cityMunicipality",
    value: props.cityMunicipality,
    type: "dropdown",
    label: "City/Municipality",
    required: true,
    options: () => {
      refCityMun.RECORDS.map((item) => {
        return {
          label: item.cityMunDesc,
          value: item.cityMunCode,
        }
      }).sort((a, b) => (a.label > b.label ? 1 : -1))
    }
  },
  {
    nameId: "barangay",
    value: props.barangay,
    type: "dropdown",
    label: "Barangay",
    required: true,
    options: () => {
      refBrgy.RECORDS.map((item) => {
        return {
          label: item.brgyDesc,
          value: item.brgyCode,
        }
      }).sort((a, b) => (a.label > b.label ? 1 : -1))
    }
  },
  {
    nameId: "zipPostal",
    value: props.zipPostal,
    type: "text",
    label: "Zip/Postal Code",
    required: true,
  }
]}
export default addressInfoForm