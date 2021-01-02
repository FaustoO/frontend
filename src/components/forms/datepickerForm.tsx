import React from "react"
import styled from "styled-components"
import axios from "../../functions/axios"
import DatePicker from "../ui/DatePicker"

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
  id: string
  user: string
  typeofproject: string
  defaultStartData?: string
  defaultPlannedEndData?: string
}

const DatePickerForm: React.FC<DatePickerFormProps> = props => {
  const [activeStartDate, setActiveStartDate] = React.useState<Date | null>(
    null
  )
  const datepickerformref = React.useRef<HTMLFormElement>(null)
  const [activeEndDate, setActiveEndDate] = React.useState<Date | null>(null)
  const [defaultStartDate, setDefaultStartDate] = React.useState<Date | null>()
  const [defaultEndDate, setDefaultEndDate] = React.useState<Date | null>()
  React.useEffect(() => {
    let activeStartDate: any = props.defaultStartData?.split("-")
    let active: any = new Date()
    let activePlannedEndDate: any = props.defaultPlannedEndData?.split("-")
    let active2: any = new Date()
    active =
      activeStartDate[1] + "-" + activeStartDate[2] + "-" + activeStartDate[0]
    active2 =
      activePlannedEndDate[1] +
      "-" +
      activePlannedEndDate[2] +
      "-" +
      activePlannedEndDate[0]
    setDefaultStartDate(active)
    setDefaultEndDate(active2)
  }, [])
  const handleActiveStartDate = (date: Date | null) => {
    console.log("here m sorry", date?.getMonth())
    let activemonth: any = date?.getMonth()
    let active: any = new Date()
    let dd = String(date?.getDate()).padStart(2, "0")
    let mm = String(activemonth + 1).padStart(2, "0") //January is 0!

    let yyyy = date?.getFullYear()
    active = mm + "-" + dd + "-" + yyyy

    setActiveStartDate(active)
  }
  const handleActivePlanningEndDate = (date: Date | null) => {
    let active: any = new Date()
    let activemonth: any = date?.getMonth()
    let dd = String(date?.getDate()).padStart(2, "0")
    let mm = String(activemonth + 1).padStart(2, "0") //January is 0!
    let yyyy = date?.getFullYear()
    active = mm + "-" + dd + "-" + yyyy
    setActiveEndDate(active)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log("heyyooo", activeStartDate)
    console.log("yesyesyov", activeEndDate)
    const ActiveStarDateClean = activeStartDate || defaultStartDate
    const ActiveEndDateClean = activeEndDate || defaultEndDate

    console.log("yep", ActiveEndDateClean, ActiveStarDateClean)
    await axios
      .put(`project/detail/${props.id}`, {
        user: props.user,
        typeofproject: props.typeofproject,
        startDate: ActiveStarDateClean,
        plannedEndDate: ActiveEndDateClean
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response.data.non_field_errors))
  }

  return (
    <>
      <Form
        id="datepickerform"
        method="post"
        ref={datepickerformref}
        onSubmit={handleSubmit}
      >
        <DatePicker
          handleStartDate={handleActiveStartDate}
          handleEndDate={handleActivePlanningEndDate}
          defaultStartData={props.defaultStartData}
          defaultPlannedEndData={props.defaultPlannedEndData}
        ></DatePicker>
      </Form>
    </>
  )
}
export default DatePickerForm
