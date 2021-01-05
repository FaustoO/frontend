import { TextField } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import axios from "../../functions/axios"

export interface EditFormProjectProps {
  id: string
  user: string
  typeofproject: string
  defaultValue: string
  isnamechanged: boolean
}

const SubmitButton = styled.button`
  display: none;
  width: 0;
  opacity: 0;
  height: 0;
  cursor: none;
`
const EditForm: React.FC<EditFormProjectProps> = props => {
  const projectnameinputref = React.useRef<any>()
  const editformref = React.useRef<React.MutableRefObject<any> | any>()
  const [activeProjectName, setActiveProjectName] = React.useState("")
  const [Label, setLabel] = React.useState<string>(props.defaultValue)
  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const [isnameChanged, setisNameChanged] = React.useState<boolean>(
    props.isnamechanged
  )
  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (activeProjectName.length < 69) {
      setisFocus(true)

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
          setActiveProjectName("")
          setLabel(
            activeProjectName.charAt(0).toUpperCase() +
              activeProjectName.slice(1)
          )
          setisNameChanged(true)
        })
        .catch(err => prompt(err))
    }
  }
  return (
    <>
      {isnameChanged && <span>Project Goal</span>}
      <form
        method="put"
        onSubmit={handleSubmit}
        ref={editformref}
        style={{ display: "flex", width: "100%" }}
      >
        <TextField
          onChange={e => {
            setActiveProjectName(e.currentTarget.value)
          }}
          error={activeProjectName.length > 69}
          helperText={
            activeProjectName.length > 69 &&
            "The project name  cannot be more than 70 character"
          }
          placeholder="...hit enter at the end..."
          inputRef={projectnameinputref}
          fullWidth
          InputLabelProps={{
            style: {
              color:
                props.isnamechanged || isFocus
                  ? "rgba(228, 220, 0, 1)"
                  : "rgba(240, 240, 255, 0.7)",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "25px",
              letterSpacing: "0em",
              textAlign: "left"
            }
          }}
          variant="filled"
          label={isnameChanged ? Label : "Project Goal Here"}
          name="Project name here"
          value={activeProjectName}
          inputProps={{ maxLength: 70 }}
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgba(240, 240, 255, 0.7)",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "29px",
              letterSpacing: "0em",
              textAlign: "left"
            }
          }}
        />
        <SubmitButton
          disabled={!activeProjectName}
          type="submit"
        ></SubmitButton>
      </form>
    </>
  )
}

export default EditForm
