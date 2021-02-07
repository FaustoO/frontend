import "date-fns"
import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import styled from "styled-components"
import CalendarIcon from "../../static/svgicon/calendar.svg"
import { CleanTypeOfData } from "../../functions/cleaningData"

interface DatePickerProps {
  defaultStartData?: string | any
  defaultPlannedEndData?: string | any
  handleStartDate: any
  handleEndDate: any
  projecttype?: string
  ismilestoneedit?: boolean
}

const DatePickerContainer = styled.div<{ width: number }>`
  display: flex;
  width: ${p => p.width}%;
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
  flex-direction: column;
  width: 65%;
`
const ProjectTypeLabelText = styled.div`
  display: flex;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  justify-content: flex-end;
  color: rgba(228, 220, 0, 0.7);
`
const ExactProjectText = styled.div`
  display: flex;
  color: rgba(240, 240, 255, 0.7);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  justify-content: flex-end;
`
const CalendarIconComp = styled.img``

const DatePicker: React.FC<DatePickerProps> = props => {
  // The first commit of Material-UI

  const [ActiveStartDate, setActiveStartDate] = React.useState<any | Date>(
    props.defaultStartData
  )
  const [onFocus, setOnFocus] = React.useState<boolean>(false)
  const [ActivePlannedDate, setActivePlannedDate] = React.useState<any>(
    props.defaultPlannedEndData
  )

  const handleStartDateChange = (date: any | null) => {
    setActiveStartDate(date)
    // const strdata =
    //   ActiveStartDate?.getDate() +
    //   "-" +
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
    }
  }, [onFocus])
  let CannotBeEqual = new Date(props.defaultStartData)
  CannotBeEqual.setDate(CannotBeEqual.getDate())
  console.log(CannotBeEqual)
  return (
    <DetailContentHeader>
      <DatePickerContainer width={props.ismilestoneedit ? 86 : 35}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {!props.ismilestoneedit && (
            <KeyboardDatePicker
              margin={"normal"}
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
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
              onChange={(e: any) => {
                setActiveStartDate(e)
                // const strdata =
                //   ActiveStartDate?.getDate() +
                //   "-" +
                //   ActiveStartDate?.getMonth() +
                //   "-" +
                //   ActiveStartDate?.getFullYear()
                props.handleStartDate(e)
              }}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              keyboardIcon={
                <CalendarIconComp src={CalendarIcon}></CalendarIconComp>
              }
            />
          )}
          <KeyboardDatePicker
            margin={props.ismilestoneedit ? "none" : "normal"}
            id="date-picker-dialog"
            label={props.ismilestoneedit ? "" : "Planning Date"}
            format="MM/dd/yyyy"
            minDate={
              props.ismilestoneedit
                ? CannotBeEqual.setDate(CannotBeEqual.getDate() + 1)
                : ActiveStartDate
            }
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
            keyboardIcon={
              <CalendarIconComp src={CalendarIcon}></CalendarIconComp>
            }
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
      {!props.ismilestoneedit && (
        <ProjectTypeContainer>
          <ProjectTypeLabelText>Project Type</ProjectTypeLabelText>
          <ExactProjectText>
            {CleanTypeOfData(props.projecttype)}
          </ExactProjectText>
        </ProjectTypeContainer>
      )}
    </DetailContentHeader>
  )
}
export default DatePicker
