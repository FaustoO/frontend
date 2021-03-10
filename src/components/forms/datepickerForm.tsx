import React from "react"
import styled from "styled-components"
import axios from "../../functions/axios"
import {
  changeStartDateOfProject,
  dueDateUpdate
} from "../../functions/process"
import DatePicker from "../ui/DatePicker"

import { useDispatch, useSelector } from "react-redux"
import { UpdateSingleProjectOrMilestoneUpdate } from "../redux/project/projectActions"
import { RootStore } from "../redux/project/projectReducer"
import {
  backendDateConverter,
  ConvertDateFormat2,
  dateDifference
} from "../../functions/cleaningData"
const Form = styled.form`
  height: 20%;
`

const SubmitButton = styled.button`
  display: none;
  width: 0;
  opacity: 0;
  height: 0;
  cursor: none;
`
export interface DatePickerFormProps {
  id?: any
  user?: string
  typeofproject?: string
  defaultStartData?: string
  defaultPlannedEndData?: string
  callbackFunction?: any
  ismilestone?: boolean
  milestones: any
  actualprojectid?: any
  endDate?: any
}

const DatePickerForm: React.FC<DatePickerFormProps> = props => {
  const project: any = useSelector((state: RootStore) =>
    state.projects.find(project =>
      project.id == props.actualprojectid ? props.actualprojectid : props.id
    )
  )
  // console.log(project, props.actualprojectid, "projectttt")
  const plannedEndDate = project?.plannedEndDate
  const endDate = props.endDate
  const [activeStartDate, setActiveStartDate] = React.useState<Date | null>(
    null
  )
  const datepickerformref = React.useRef<HTMLFormElement>(null)
  const [activeEndDate, setActiveEndDate] = React.useState<Date | null>(null)
  const [defaultStartDate, setDefaultStartDate] = React.useState<Date | null>()
  const [defaultEndDate, setDefaultEndDate] = React.useState<Date | null>()
  const dispatch = useDispatch()

  const handleActiveStartDate = (date: Date | null) => {
    let activemonth: any = date?.getMonth()
    let active: any = new Date()
    let dd = String(date?.getDate()).padStart(2, "0")
    let mm = String(activemonth + 1).padStart(2, "0") //January is 0!

    let yyyy = date?.getFullYear()
    active = yyyy + "-" + mm + "-" + dd

    setActiveStartDate(active)
  }
  const handleActivePlanningEndDate = (date: Date | null) => {
    let active: any = new Date()
    let activemonth: any = date?.getMonth()
    let dd = String(date?.getDate()).padStart(2, "0")
    let mm = String(activemonth + 1).padStart(2, "0") //January is 0!
    let yyyy = date?.getFullYear()
    active = yyyy + "-" + mm + "-" + dd
    setActiveEndDate(active)
  }
  const handleActiveMilestoneEndDate = (date: Date | null) => {
    let active: any = new Date()
    let activemonth: any = date?.getMonth()
    let dd = String(date?.getDate()).padStart(2, "0")
    let mm = String(activemonth + 1).padStart(2, "0") //January is 0!
    let yyyy = date?.getFullYear()
    active = yyyy + "-" + mm + "-" + dd
    setActiveEndDate(active)
  }
  const handleActiveMilestoneStartDate = (date: Date | null) => {
    let activemonth: any = date?.getMonth()
    let active: any = new Date()
    let dd = String(date?.getDate()).padStart(2, "0")
    let mm = String(activemonth + 1).padStart(2, "0") //January is 0!

    let yyyy = date?.getFullYear()
    active = yyyy + "-" + mm + "-" + dd

    setActiveStartDate(active)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const ActiveStarDateClean = activeStartDate || defaultStartDate
    const ActiveEndDateClean = activeEndDate || defaultEndDate
    let promise: any = []
    if (ActiveStarDateClean === activeStartDate) {
      // console.log("START DATE CHANGES STARTED")
      console.log("defaultEndDate", props.defaultPlannedEndData)
      await changeStartDateOfProject(
        ActiveStarDateClean,
        props.defaultPlannedEndData,
        props.id
      )
    } else if (ActiveEndDateClean === activeEndDate) {
      // console.log(
      //   "OKEY",
      //   endDate,
      //   ActiveEndDateClean,
      //   dateDifference(
      //     new Date(String(ActiveEndDateClean)),
      //     new Date(String(backendDateConverter(endDate)))
      //   )
      // )
      console.log(
        "look ma brazzers",
        ConvertDateFormat2(ActiveEndDateClean),
        ActiveEndDateClean,
        endDate
      )
      promise.push(
        dispatch(
          UpdateSingleProjectOrMilestoneUpdate(
            props.id,
            [
              {
                plannedEndDate: backendDateConverter(
                  String(ActiveEndDateClean)
                ),
                timeDifference: Math.round(
                  dateDifference(
                    new Date(String(ActiveEndDateClean)),
                    new Date(String(endDate))
                  )
                )
              }
            ],
            false
          )
        )
      )
      // Promise.all(promise).then(res => getTotals(props.id))
    }

    // await axios
    //   .put(`project/detail/${props.id}`, {
    //     user: props.user,
    //     typeofproject: props.typeofproject,
    //     startDate: ActiveStarDateClean,
    //     plannedEndDate: ActiveEndDateClean
    //   })
    //   .then(res => {
    //     console.log("plannedenddate and startDate updated")
    //   })
    //   .catch(err => console.log(err))
    // await getTotals(props.id, props.callbackFunction)
  }

  const handleMilestoneDateSubmit = async (e: any) => {
    e.preventDefault()
    const ActiveStarDateClean = activeStartDate || defaultStartDate
    const ActiveEndDateClean = activeEndDate || defaultEndDate
    await dueDateUpdate(
      ActiveEndDateClean,
      props.callbackFunction,
      props.id,
      props.milestones,
      props.actualprojectid,
      plannedEndDate
    )
    // console.log("props.id", props.id)
    // await getTotals(props.actualprojectid, props.callbackFunction)
    // await axios
    //   .put(`project/detail/milestones/${props.id}`, {
    //     id: props.id,
    //     dueDate: ActiveEndDateClean
    //   })
    //   .then(res => {
    //     props.callbackFunction()
    //   })
    //   .catch(err => console.log(err))
    // console.log("milestone end adate checkhere")
  }

  return (
    <>
      <Form
        id="datepickerform"
        method="post"
        ref={datepickerformref}
        onSubmit={props.ismilestone ? handleMilestoneDateSubmit : handleSubmit}
      >
        <DatePicker
          milestones={props.milestones}
          ismilestoneedit={props.ismilestone}
          projecttype={props.typeofproject}
          handleStartDate={
            props.ismilestone
              ? handleActiveMilestoneStartDate
              : handleActiveStartDate
          }
          handleEndDate={
            props.ismilestone
              ? handleActiveMilestoneEndDate
              : handleActivePlanningEndDate
          }
          defaultStartData={props.defaultStartData}
          defaultPlannedEndData={props.defaultPlannedEndData}
        ></DatePicker>
      </Form>
    </>
  )
}
export default DatePickerForm
