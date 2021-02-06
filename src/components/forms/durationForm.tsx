import { TextField } from "@material-ui/core"
import React, { Component } from "react"
import { inherits } from "util"
import axios from "../../functions/axios"
import { SubmitButton } from "./editprojectnameform"
export interface DurationFormProps {
  defaultValue: number
  milestioneid: string
}

const DurationForm: React.FC<DurationFormProps> = props => {
  const handleDurationEdit = async () => {}
  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const SubmitButtonRef = React.useRef<React.MutableRefObject<any> | any>()
  const [activeProjectName, setActiveProjectName] = React.useState("")

  const editformref = React.useRef<React.MutableRefObject<any> | any>()
  return (
    <form
      style={{ all: "inherit" }}
      ref={editformref}
      onSubmit={handleDurationEdit}
    >
      <TextField
        onFocus={() => {
          setisFocus(true)
        }}
        onBlur={() => {
          setisFocus(false)

          SubmitButtonRef.current.click()
        }}
        defaultValue={props.defaultValue}
      ></TextField>
      <SubmitButton
        ref={SubmitButtonRef}
        disabled={!activeProjectName}
        type="submit"
      ></SubmitButton>
    </form>
  )
}

export default DurationForm
