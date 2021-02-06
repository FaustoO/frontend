import { TextField } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import ReactDOM from "react-dom"
import axios from "../../functions/axios"

export interface EditFormProjectProps {
  id?: string
  user?: string
  typeofproject?: string
  defaultValue?: string
  isnamechanged?: boolean
  callbackFunction?: any
  ismilestoneedit?: boolean
  issmall?: boolean
}

export const SubmitButton = styled.button`
  display: none;
  width: 0;
  opacity: 0;
  height: 0;
  cursor: none;
  z-index: -9999;
`
const ProjectGoalLabel = styled.span<{ isFocused: boolean }>`
  color: rgba(228, 220, 0, 1);
  font-size: 18px;
  position: relative;
  top: ${p => (p.isFocused ? "15px" : "20px")};
  transition: top 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`
const EditForm: React.FC<EditFormProjectProps> = props => {
  const projectnameinputref = React.useRef<any>()
  const editformref = React.useRef<React.MutableRefObject<any> | any>()
  const [activeProjectName, setActiveProjectName] = React.useState("")
  const [editActiveArray, seteditActiveArray] = React.useState<any[]>([])
  const SubmitButtonRef = React.useRef<React.MutableRefObject<any> | any>()

  const [Label, setLabel] = React.useState<string | any>(props.defaultValue)
  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const [isnameChanged, setisNameChanged] = React.useState<boolean | any>(
    props.isnamechanged
  )
  const handleProjectNameSubmit = (e: any) => {
    e.preventDefault()
    if (activeProjectName.length < 69 && activeProjectName !== "") {
      setisFocus(false)

      projectnameinputref.current.blur()
      axios
        .put(`project/detail/${props.id}`, {
          user: props.user,
          typeofproject: props.typeofproject,
          goal:
            activeProjectName.charAt(0).toUpperCase() +
            activeProjectName.slice(1),
          isnamechanged: true
        })
        .then(res => {
          props.callbackFunction()
        })
        .catch(err => prompt(err))
    }
  }
  const handleMilestoneNameSubmit = (e: any) => {
    console.log("heyooo")
    e.preventDefault()
    props.callbackFunction()
  }
  return (
    <>
      <ProjectGoalLabel isFocused={isFocus}>
        {props.ismilestoneedit ? "Goal" : "Project Goal"}
      </ProjectGoalLabel>
      <form
        method="put"
        id="projectgoalform"
        onSubmit={
          props.ismilestoneedit
            ? handleMilestoneNameSubmit
            : handleProjectNameSubmit
        }
        ref={editformref}
        style={{
          display: "flex",
          width: "100%"
        }}
      >
        {props.ismilestoneedit ? (
          <TextField
            onChange={e => {
              setActiveProjectName(e.currentTarget.value)
            }}
            error={activeProjectName.length > 69}
            helperText={
              activeProjectName.length > 69 &&
              "The project name  cannot be more than 70 character"
            }
            inputRef={projectnameinputref}
            fullWidth
            InputLabelProps={{
              style: {
                color: "rgba(240, 240, 255, 1)",
                fontSize: props.issmall ? "18px" : "24px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: props.issmall ? "21.6px" : "25px",
                letterSpacing: "0em",
                textAlign: "left",
                visibility: isFocus ? "hidden" : "visible"
              }
            }}
            onFocus={() => {
              setisFocus(true)
            }}
            onBlur={() => {
              setisFocus(false)

              SubmitButtonRef.current.click()
            }}
            label={
              isnameChanged
                ? Label
                : props.ismilestoneedit
                ? "Type in the goal of the milestone here"
                : "Project Goal Here*"
            }
            name="Project name here"
            value={activeProjectName}
            inputProps={{ maxLength: 70 }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgba(240, 240, 255, 1)",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "29px",
                letterSpacing: "0em",
                textAlign: "left"
              }
            }}
          />
        ) : (
          <TextField
            onChange={e => {
              setActiveProjectName(e.currentTarget.value)
            }}
            error={activeProjectName.length > 69}
            helperText={
              activeProjectName.length > 69 &&
              "The project name  cannot be more than 70 character"
            }
            inputRef={projectnameinputref}
            fullWidth
            InputLabelProps={{
              style: {
                color: "rgba(240, 240, 255, 1)",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "25px",
                letterSpacing: "0em",
                textAlign: "left",
                visibility: isFocus ? "hidden" : "visible"
              }
            }}
            onFocus={() => {
              setisFocus(true)
            }}
            onBlur={() => {
              setisFocus(false)

              SubmitButtonRef.current.click()
            }}
            label={isnameChanged ? Label : "Project Goal Here*"}
            name="Project name here"
            value={activeProjectName}
            inputProps={{ maxLength: 70 }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgba(240, 240, 255, 1)",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "29px",
                letterSpacing: "0em",
                textAlign: "left"
              }
            }}
          />
        )}

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

export default EditForm
