import { dateTimePickerDefaultProps } from "@material-ui/pickers/constants/prop-types"
import { differenceInBusinessDays } from "date-fns"
import React from "react"
const calculateMilestonesPositioning = (
  list,
  startdate,
  fullwidth,
  isexpired,
  fullwidthgray,
  diffenddatestartdate
) => {
  const projectstartdate: any = new Date(startdate)
  let fullWidth = fullwidth

  //expired
  return Array.from(list).map((data: any, index: number) => {
    if (isexpired) {
      const milestoneStartDateDate: any = new Date(data.startDate)

      const diffTimeMilestoneandProjectStartDate =
        milestoneStartDateDate - projectstartdate
      const diffMilestoneAndProjectStartDateDays = Math.ceil(
        diffTimeMilestoneandProjectStartDate / (1000 * 60 * 60 * 24)
      )
      const positioning =
        (diffMilestoneAndProjectStartDateDays / diffenddatestartdate) *
        fullWidth
      return positioning
    } else {
      const milestoneStartDateDate: any = new Date(data.startDate)

      const diffTimeMilestoneandProjectStartDate =
        milestoneStartDateDate - projectstartdate
      const diffMilestoneAndProjectStartDateDays = Math.ceil(
        diffTimeMilestoneandProjectStartDate / (1000 * 60 * 60 * 24)
      )
      const positioning =
        (diffMilestoneAndProjectStartDateDays / diffenddatestartdate) *
        fullWidth
      return positioning
    }
  })

  //not expired
}
export const dateDifference = (date1: Date, date2: Date) => {
  const datefirst: any = new Date(date1)
  const datesecond: any = new Date(date2)

  let calculatedifference = datefirst - datesecond
  return Math.round(calculatedifference / (1000 * 60 * 60 * 24))
}
export const dateDifference2 = (date1: Date, date2: Date) => {
  const datefirst: any = new Date(date1)
  const datesecond: any = new Date(date2)
  let calculatedifference = datefirst - datesecond
  return calculatedifference / (1000 * 60 * 60 * 24)
}
export const PercentageConvertation = (value: number) => {
  let num: number = Number(value) // The Number() only visualizes the type and is not needed
  let roundedString: any = num.toFixed(2)
  let rounded: number = Number(roundedString) // toFixed() returns a string (often suitable for printing already)
  return rounded * 100
}
const ConvertDateFormat = (date: string | any) => {
  let splitteddate = date?.split("-")
  let convertedformatdate = ""
  if (splitteddate) {
    convertedformatdate =
      splitteddate[1] + "/" + splitteddate[2] + "/" + splitteddate[0]
  }
  return convertedformatdate
}
export const ConvertDateFormat2 = (date: string | any) => {
  let splitteddate = date?.split("-")
  let convertedformatdate = ""
  if (splitteddate) {
    convertedformatdate =
      splitteddate[2] + "/" + splitteddate[0] + "/" + splitteddate[1]
  }
  return new Date(convertedformatdate)
}

export const calculateDatesPositioning = (
  startDate: Date,
  endDate: Date,
  PlannedEndDate: Date,
  timeDifferenceBetweenPlannedDateAndEndDate: number,
  progressOfProject: number,
  progressOfTime: number,
  ismilestones: boolean
) => {
  let startdate: any = startDate
  let enddate: any = endDate
  let plannedenddate: any = PlannedEndDate
  let diffstartdateplannedenddate = dateDifference(plannedenddate, startdate) //Planned and startdate days difference
  let diffstartdateenddate = dateDifference(enddate, startdate) // end date and start date days difference
  let diffplannedandEnddate = timeDifferenceBetweenPlannedDateAndEndDate //planned end date end date difference which come from backend
  let fullWidthGray = 0
  let fullWidth = 0
  let progressprojecttime = 0
  let progressofproject = 0
  let secondlineWidth = 0
  let firstline = 0
  let isexpired: any = false
  if (ismilestones) {
    fullWidthGray = 100

    fullWidth = 100
    firstline = PercentageConvertation(progressOfTime)
    secondlineWidth = fullWidth - firstline

    progressofproject = PercentageConvertation(progressOfProject)
    if (progressofproject > 100) {
      progressofproject = 100
    } else {
    }

    fullWidthGray = 100
    return {
      diffstartdateplannedenddate,
      diffstartdateenddate,
      diffplannedandEnddate,
      fullWidthGray,
      fullWidth,
      progressofproject,
      progressprojecttime,
      secondlineWidth,
      firstline,
      isexpired
    }
  } else {
    // console.log("lookoutherelater", diffplannedandEnddate)
    if (diffplannedandEnddate > 0) {
      isexpired = false
      // if not expired do something

      fullWidthGray = 100
      fullWidth = diffstartdateenddate / diffstartdateplannedenddate
      fullWidth = PercentageConvertation(fullWidth)

      firstline = (fullWidth / 100) * PercentageConvertation(progressOfTime)

      secondlineWidth = fullWidth - firstline
      // if (progressOfProject > 1) {
      //   progressofproject = 100
      // } else {
      progressofproject =
        (fullWidth / 100) * PercentageConvertation(progressOfProject)
      // }

      diffstartdateplannedenddate = 99
    } else if (diffplannedandEnddate <= 0) {
      //if date expired do something
      isexpired = true
      fullWidth = 100
      firstline = PercentageConvertation(progressOfTime)
      secondlineWidth = fullWidth - firstline

      progressofproject = PercentageConvertation(progressOfProject)
      if (progressofproject > 100) {
        progressofproject = 100
      } else {
      }
      diffstartdateplannedenddate =
        (diffstartdateplannedenddate / diffstartdateenddate) * 100
      fullWidthGray = diffstartdateplannedenddate
    }

    return {
      diffstartdateplannedenddate,
      diffstartdateenddate,
      diffplannedandEnddate,
      fullWidthGray,
      fullWidth,
      progressofproject,
      progressprojecttime,
      secondlineWidth,
      firstline,
      isexpired
    }
  }
}

const CleanTypeOfData = (projecttype: string | undefined) => {
  let stringprojectname = ""
  if (projecttype === "S") {
    stringprojectname = "Step By Step"
  } else if (projecttype === "All") {
    //pass
  } else if (projecttype === "Cyc") {
    //pass
  }
  return stringprojectname
}
const Convertpercentage = (value: number | any | undefined) => {
  let convertednumber = value * 10
  let converted = Math.round(convertednumber)
  return { converted }
}
const Convertpercentageforbackend = (value: number | any | undefined) => {
  let convertednumber = value / 100

  return convertednumber
}

const LinearProgressBarCleaningData = (value: number) => {
  let fullwithPlannedEndDate = false
  let fullwithEndDate = false
  let timedifferancevalue = value
  let percentageTimeDifference = Math.abs(Math.round(timedifferancevalue * 10))
  let lenpercentageTimeDifference = Math.abs(
    Math.round(percentageTimeDifference.toString().length)
  )
  let gettenpower = Math.pow(10, lenpercentageTimeDifference - 1)

  if (percentageTimeDifference < 100) {
    //pass
  } else {
    percentageTimeDifference = Math.abs(
      Math.round((percentageTimeDifference / gettenpower) * 10)
    )
  }

  if (value < 0) {
    fullwithPlannedEndDate = false
    fullwithEndDate = true
  } else if (value > 0) {
    fullwithPlannedEndDate = true
    fullwithEndDate = false
  }

  return {
    fullwithPlannedEndDate,
    fullwithEndDate,
    percentageTimeDifference
  }
}
const truncate = (str: string, cutpoint: number, maxlimitlength: number) => {
  return str.length > maxlimitlength
    ? `${str.substring(0, cutpoint) + "..."}`
    : str
}
const backendDateConverter = (date: string) => {
  let stringDate = date
  let dateVar = stringDate.split("-")
  let strtodate = new Date(dateVar[0] + "/" + dateVar[1] + "/" + dateVar[2])
  let activemonth: any = strtodate?.getMonth()
  let active: string = ""
  let dd = String(strtodate?.getDate()).padStart(2, "0")
  let mm = String(activemonth + 1).padStart(2, "0") //January is 0!

  let yyyy = strtodate?.getFullYear()
  active = mm + "-" + dd + "-" + yyyy
  console.log("backendDateConverter", stringDate, strtodate, active)
  return active
}
const frontendDatePlus = (date: string, duration: number) => {
  let stringDate = date
  let dateVar = stringDate.split("-")
  let newdate = new Date(dateVar[0] + "/" + dateVar[1] + "/" + dateVar[2])
  newdate.setDate(newdate.getDate() + duration)
  let activemonth: any = newdate?.getMonth()
  let active: string = ""
  let dd = String(newdate?.getDate()).padStart(2, "0")
  let mm = String(activemonth + 1).padStart(2, "0") //January is 0!

  let yyyy = newdate?.getFullYear()
  active = yyyy + "-" + mm + "-" + dd
  console.log("frontendDatePlus", stringDate, active)
  return active
}
const frontendDatePlus2 = (date: string, duration: number) => {
  let getduration = duration
  let stringDate = date
  let dateVar = stringDate.split("-")
  let newdate = new Date(dateVar[1] + "/" + dateVar[2] + "/" + dateVar[0])
  let letsadd = new Date(newdate.setDate(newdate.getDate() + getduration))

  let activemonth: any = newdate?.getMonth()
  let active: string = ""
  let dd = String(newdate?.getDate()).padStart(2, "0")
  let mm = String(activemonth + 1).padStart(2, "0") //January is 0!

  let yyyy = newdate?.getFullYear()
  active = mm + "-" + dd + "-" + yyyy
  return active
}
const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions
}
const getToday = () => {
  let today: any = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  let yyyy = today.getFullYear()

  today = mm + "-" + dd + "-" + yyyy

  return today
}

export {
  CleanTypeOfData,
  Convertpercentage,
  ConvertDateFormat,
  LinearProgressBarCleaningData,
  calculateMilestonesPositioning,
  truncate,
  backendDateConverter,
  frontendDatePlus,
  Convertpercentageforbackend,
  frontendDatePlus2,
  useContainerDimensions,
  getToday
}
