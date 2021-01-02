import "date-fns"
import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers"
import styled from "styled-components"

interface DatePickerProps {
  defaultStartData?: string
  defaultPlannedEndData?: string
  handleStartDate: any
  handleEndDate: any
}

const DatePickerContainer = styled.div`
  display: flex;
  width: 35%;
  justify-content: space-between;
`
const DetailContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`
const ProjectTypeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 65%;
`
const DatePicker: React.FC<DatePickerProps> = props => {
  // The first commit of Material-UI
  const keyboardDatePickerRef = React.useRef<any>()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  )
  const [ActiveStartDate, setActiveStartDate] = React.useState<any | Date>(
    props.defaultStartData
  )
  const [onFocus, setOnFocus] = React.useState<boolean>(false)
  const [ActivePlannedDate, setActivePlannedDate] = React.useState<any>(
    props.defaultPlannedEndData
  )
  React.useEffect(() => {
    console.log(keyboardDatePickerRef)
  }, [keyboardDatePickerRef])

  const handleStartDateChange = (date: any | null) => {
    console.log("you changed", date)
    setActiveStartDate(date)
    // const strdata =
    //   ActiveStartDate?.getDate() +
    //   "-" +
    console.log(keyboardDatePickerRef)
    //   ActiveStartDate?.getMonth() +
    //   "-" +
    //   ActiveStartDate?.getFullYear()
    props.handleStartDate(date)
  }
  const handlePlanningEndDateChange = (date: any | null) => {
    setActivePlannedDate(date)
    props.handleEndDate(date)
  }
  React.useEffect(() => {
    if (onFocus === true) {
      const getbutton = document.getElementsByClassName(
        "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
      )
      getbutton[0].setAttribute("type", "submit")
      getbutton[1].setAttribute("type", "submit")
      getbutton[0].setAttribute("form", "datepickerform")
      getbutton[1].setAttribute("form", "datepickerform")
      console.log(getbutton)
    }
  }, [onFocus])
  return (
    <DetailContentHeader>
      <DatePickerContainer>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Start Date"
            format="MM/dd/yyyy"
            minDate={ActiveStartDate}
            allowKeyboardControl={false}
            value={ActiveStartDate}
            InputLabelProps={{
              style: {
                color: "rgba(228, 220, 0, 1)",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "25px",
                letterSpacing: "0em",
                textAlign: "left"
              }
            }}
            InputProps={{
              style: {
                borderBottom: "2px solid white",
                color: "rgba(240, 240, 255, 0.7)"
              }
            }}
            DialogProps={{
              onFocus: () => {
                setOnFocus(true)
              },
              onBlur: () => {
                setOnFocus(false)
              }
            }}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
              onClick: () => {
                console.log("hey günaydın")
              }
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Planning Date"
            format="MM/dd/yyyy"
            minDate={ActiveStartDate}
            value={ActivePlannedDate}
            allowKeyboardControl={false}
            InputLabelProps={{
              style: {
                color: "rgba(228, 220, 0, 1)",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "25px",
                letterSpacing: "0em",
                textAlign: "left"
              }
            }}
            InputProps={{
              style: {
                borderBottom: "2px solid white",
                color: "rgba(240, 240, 255, 0.7)"
              }
            }}
            DialogProps={{
              onFocus: () => {
                setOnFocus(true)
              },
              onBlur: () => {
                setOnFocus(false)
              }
            }}
            onChange={handlePlanningEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </DatePickerContainer>
      <ProjectTypeContainer>Project type</ProjectTypeContainer>
    </DetailContentHeader>
  )
}
export default DatePicker
