import React, { useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dialog } from "primereact/dialog"
import { FileUpload } from "primereact/fileupload"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

const Files = () => {
  const [modalView, toggleModalView] = useState(false)

  return (
  <div>
      <h2>Files</h2>
      <Button
        label="Upload"
        icon="pi pi-save"
        className="p-my-3 p-button-sm p-button-primary"
        onClick={() => toggleModalView(true)}
      />
      <DataTable
        value={[
          {
            name: "Health Declaration Form",
            dateCreated: "06/01/2021",
            dateUpdated: "07/01/2021",
            actions: (
              <>
                <a href="#">View</a> <a href="#">Download</a>
              </>
            ),
          },
          {
            name: "Digital Vaccination Card",
            dateCreated: "06/01/2021",
            dateUpdated: "07/01/2021",
            actions: (
              <>
                <a href="#">View</a> <a href="#">Download</a>
              </>
            ),
          },
        ]}
        emptyMessage="No Records Found"
      >
        <Column header="File" field="name"></Column>
        <Column header="Date Created" field="dateCreated"></Column>
        <Column header="Date Updated" field="dateUpdated"></Column>
        <Column header="Actions" field="actions"></Column>
      </DataTable>

      <Dialog
        visible={modalView}
        onHide={() => toggleModalView(false)}
        header="Add New File"
      >
        <div className="p-fluid p-grid p-mt-3">
          <div className="p-field p-col-12">
            <span className="p-float-label">
              <InputText />
              <label>File Name</label>
            </span>
          </div>
          <div className="p-field p-col-12">
            <span className="p-float-label">
              <FileUpload
                name="demo[]"
                url="./upload"
                accept="image/*,.pdf"
                maxFileSize="1000000"
                mode="advanced"
              />
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Files
