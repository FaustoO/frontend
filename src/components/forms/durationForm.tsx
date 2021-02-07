import { TextField, Typography } from "@material-ui/core"
import React, { Component } from "react"
import { inherits } from "util"
import axios from "../../functions/axios"
import { SubmitButton } from "./editprojectnameform"
import { withStyles } from "@material-ui/core/styles"
import { useStyles } from "@material-ui/pickers/views/Calendar/Day"
export interface DurationFormProps {
  defaultValue: number
  milestoneid: string
  callbackFunction?: any
}

// import { withStyles } from "@material-ui/core/styles"

// const styles = theme => ({
//   number: {
//     "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
//       "-webkit-appearance": "none",
//       margin: 0
//     }
//   },
//   input: {
//     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//       "-webkit-appearance": "none",
//       margin: 0
//     }
//   }
// })
const DurationForm: React.FC<DurationFormProps> = props => {
  const handleDurationEdit = async e => {
    console.log("heyooo", props.milestoneid, activeProjectName)
    e.preventDefault()
    await axios
      .put(`project/detail/milestones/${props.milestoneid}`, {
        duration: activeProjectName
      })
      .then(res => {
        console.log(res.data)
        props.callbackFunction()
      })
      .catch(err => prompt(err))
  }
  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const SubmitButtonRef = React.useRef<React.MutableRefObject<any> | any>()
  const [activeProjectName, setActiveProjectName] = React.useState("")

  const editformref = React.useRef<React.MutableRefObject<any> | any>()

  return (
    <>
      <form ref={editformref} onSubmit={handleDurationEdit}>
        <TextField
          onFocus={() => {
            setisFocus(true)
          }}
          onChange={e => {
            setActiveProjectName(e.currentTarget.value)
          }}
          onBlur={() => {
            setisFocus(false)

            SubmitButtonRef.current.click()
          }}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment: (
              <Typography>{props.defaultValue > 1 ? "Days" : "Day"}</Typography>
            ),
            disableUnderline: true,
            style: {
              color: "inherit",
              fontSize: "inherit",
              fontStyle: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              letterSpacing: "inherit",
              textAlign: "center"
            }
          }}
          variant="filled"
          type="number"
          inputProps={{
            style: { padding: 0, textAlign: "left" },
            min: 1,
            inputMode: "numeric"
          }}
          defaultValue={props.defaultValue}
        ></TextField>
        <SubmitButton
          ref={SubmitButtonRef}
          disabled={!activeProjectName}
          type="submit"
        ></SubmitButton>
      </form>
      <span
        style={{
          display: "flex;",
          boxSizing: "border-box",
          fill: "rgba(240, 240, 255, 1)",
          maxHeight: "1px",
          minHeight: "1px",
          borderRadius: "5px",
          backgroundColor: " rgba(240, 240, 255, 1)"
        }}
      ></span>
    </>
  )
}

export default DurationForm
