import React, { useEffect, useState } from "react"
import { Dropdown } from "primereact/dropdown"
import addressInfoForm from "../utils/addressInfoForm"
import { ProgressBar } from "primereact/progressbar"

const AddressComponent = ({
  formData,
  setFormData,
  region,
  provinceState,
  cityMunicipality,
  barangay,
  blankFields,
  ...rest
}) => {
  const [regionOptions, setRegionOptions] = useState([])
  const [provinceStateOptions, setProvinceStateOptions] = useState([])
  const [cityMunicipalityOptions, setCityMunicipalityOptions] = useState([])
  const [barangayOptions, setBarangayOptions] = useState([])
  const [loadingBar, setLoadingBar] = useState({
    region: false,
    provinceState: false,
    cityMunicipality: false,
    barangay: false,
  })

  useEffect(() => {
    (async () => {
      setLoadingBar({ ...loadingBar, region: true })
      let regions = await fetch("https://bakuna.sollertiainc.com/rest/regions").catch(error => [])
      console.log(regions)
      
      regions = regions.length > 0 ? await regions.json() : [] 
      if(regions.length > 0){
        setRegionOptions(
          regions?.items
            .map((item) => {
              return {
                label: unescape(encodeURIComponent(item.description)),
                value: item.id.toString(),
              }
            })
            .sort((a, b) => (a.label > b.label ? 1 : -1))
        )
      } else {
        setRegionOptions([])
      }
    })()
  }, [])

  useEffect(() => {
    if (regionOptions.length > 0) {
      setLoadingBar({ ...loadingBar, region: false })
    }
  }, [regionOptions])

  useEffect(() => {
    (async () => {
      if (region !== "") {
        setLoadingBar({ ...loadingBar, provinceState: true })
        let provinces = await fetch(
          `https://bakuna.sollertiainc.com/rest/provinces?rid=${region}`
        ).catch(error => [])
        provinces = provinces.length > 0 ? await provinces.json() : []

        if(provinces.length > 0){
          setProvinceStateOptions(
            provinces.items
              .map((item) => {
                return {
                  label: unescape(
                    encodeURIComponent(item.description.replace(/_/g, " "))
                  ),
                  value: item.id.toString(),
                }
              })
              .sort((a, b) => (a.label > b.label ? 1 : -1))
          )
        } else {
          setProvinceStateOptions([])
        }
      }
    })()
  }, [region])

  useEffect(() => {
    if (provinceStateOptions.length > 0) {
      setLoadingBar({ ...loadingBar, provinceState: false })
    }
  }, [provinceStateOptions])

  useEffect(() => {
    (async () => {
      if (provinceState !== "") {
        setLoadingBar({ ...loadingBar, cityMunicipality: true })
        let cities = await fetch(
          `https://bakuna.sollertiainc.com/rest/cities?pid=${provinceState}`
        )
        cities = await cities.json()

        setCityMunicipalityOptions(
          cities.items
            .map((item) => {
              return {
                label: unescape(
                  encodeURIComponent(item.description.replace(/_/g, " "))
                ),
                value: item.id.toString(),
              }
            })
            .sort((a, b) => (a.label > b.label ? 1 : -1))
        )
      }
    })()
  }, [provinceState])

  useEffect(() => {
    if (cityMunicipalityOptions.length > 0) {
      setLoadingBar({ ...loadingBar, cityMunicipality: false })
    }
  }, [cityMunicipalityOptions])

  useEffect(() => {
    ;(async () => {
      if (cityMunicipality !== "") {
        setLoadingBar({ ...loadingBar, barangay: true })
        let barangays = await fetch(
          `https://bakuna.sollertiainc.com/rest/barangays?cid=${cityMunicipality}`
        )
        barangays = await barangays.json()
        setBarangayOptions(
          barangays.items
            .map((item) => {
              return {
                label: unescape(
                  encodeURIComponent(item.description.split("_").pop())
                ),
                value: item.id.toString(),
              }
            })
            .sort((a, b) => (a.label > b.label ? 1 : -1))
        )
      }
    })()
  }, [cityMunicipality])

  useEffect(() => {
    if (barangayOptions.length > 0) {
      setLoadingBar({ ...loadingBar, barangay: false })
    }
  }, [barangayOptions])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  console.log(region)
  console.log(regionOptions)
  return (
    <>
      <div className="p-field p-col-12">
        <span className="p-float-label">
          <Dropdown
            id="region"
            name="region"
            value={region}
            options={regionOptions}
            onChange={(e) => onChange(e)}
            optionLabel="label"
            optionValue="value"
            className={blankFields.includes("region") ? "p-invalid" : ""}
            {...rest}
          />
          <label htmlFor="country">Region</label>
        </span>
        {loadingBar.region && (
          <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
        )}
      </div>
      <div className="p-field p-col-12">
        <span className="p-float-label">
          <Dropdown
            id="provinceState"
            name="provinceState"
            value={provinceState}
            options={provinceStateOptions}
            onChange={(e) => onChange(e)}
            optionLabel="label"
            optionValue="value"
            className={blankFields.includes("provinceState") ? "p-invalid" : ""}
            {...rest}
          />
          <label htmlFor="provinceState">Province/State</label>
        </span>
        {loadingBar.provinceState && (
          <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
        )}
      </div>
      <div className="p-field p-col-12">
        <span className="p-float-label">
          <Dropdown
            id="cityMunicipality"
            name="cityMunicipality"
            value={cityMunicipality}
            options={cityMunicipalityOptions}
            onChange={(e) => onChange(e)}
            optionLabel="label"
            optionValue="value"
            className={
              blankFields.includes("cityMunicipality") ? "p-invalid" : ""
            }
            {...rest}
          />
          <label htmlFor="cityMunicipality">City</label>
        </span>
        {loadingBar.cityMunicipality && (
          <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
        )}
      </div>
      <div className="p-field p-col-12">
        <span className="p-float-label">
          <Dropdown
            id="barangay"
            name="barangay"
            value={barangay}
            options={barangayOptions}
            onChange={(e) => onChange(e)}
            optionLabel="label"
            optionValue="value"
            className={blankFields.includes("barangay") ? "p-invalid" : ""}
            {...rest}
          />
          <label htmlFor="barangay">Barangay</label>
        </span>
        {loadingBar.barangay && (
          <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
        )}
      </div>
    </>
  )
}

export default AddressComponent
