import { TextField, Typography } from "@material-ui/core"
import React from "react"
import { SubmitButton } from "./editprojectnameform"
import {
  Convertpercentageforbackend,
  PercentageConvertation
} from "../../functions/cleaningData"
import {
  calculateGoalAchievingProbability,
  progressUpdate
} from "../../functions/process"
import { useDispatch } from "react-redux"
import { UpdateSingleProjectOrMilestoneUpdate } from "../redux/project/projectActions"
export interface ProgressFormProps {
  defaultValue: number
  milestoneid: string
  callbackFunction?: any
  projectid: any
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
const ProgressForm: React.FC<ProgressFormProps> = props => {
  const dispatch = useDispatch()
  const handleDurationEdit = async e => {
    // console.log(
    //   "heyooo",
    //   props.milestoneid,
    //   activeProjectName,
    //   Convertpercentageforbackend(activeProjectName)
    // )
    e.preventDefault()
    const promises: any = []

    progressUpdate(
      Convertpercentageforbackend(activeProjectName),
      props.milestoneid,
      props.projectid
    )
    // promises.push(
    //   dispatch(
    //     UpdateSingleProjectOrMilestoneUpdate(
    //       props.milestoneid,
    //       [{ progress: Convertpercentageforbackend(activeProjectName) }],
    //       true
    //     )
    //   )
    // )
    // await Promise.all(promises).then(async responses =>
    //   getTotals(props.projectid)
    // )
    // await axios
    //   .put(`project/detail/milestones/${props.milestoneid}`, {
    //     progress:
    //   })
    //   .then(res => {
    //     console.log(`Milestone progress updated${res.data.id}`)
    //   })
    //   .catch(err => prompt(err))

    // await getTotals(props.projectid, props.callbackFunction)
  }
  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const SubmitButtonRef = React.useRef<React.MutableRefObject<any> | any>()
  const [activeProjectName, setActiveProjectName] = React.useState("")

  const editformref = React.useRef<React.MutableRefObject<any> | any>()

  return (
    <>
      <form ref={editformref} onSubmit={handleDurationEdit}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            style={{ width: "20%" }}
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
              style: { padding: 0, textAlign: "right" },
              min: 0,
              max: 100,
              inputMode: "numeric"
            }}
            defaultValue={Math.ceil(PercentageConvertation(props.defaultValue))}
          >
            {" "}
          </TextField>
          <SubmitButton
            ref={SubmitButtonRef}
            disabled={!activeProjectName}
            type="submit"
          ></SubmitButton>
          <Typography style={{ marginLeft: "5px" }}>%</Typography>
        </div>
      </form>

      <span
        style={{
          display: "flex;",
          boxSizing: "border-box",
          fill: "rgba(240, 240, 255, 1)",
          maxHeight: "1px",
          minHeight: "1px",
          borderRadius: "5px",
          width: "20%",
          backgroundColor: " rgba(240, 240, 255, 1)"
        }}
      ></span>
    </>
  )
}

export default ProgressForm
