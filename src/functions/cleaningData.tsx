import { differenceInBusinessDays } from "date-fns"

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
  let calculatedifference = Math.abs(datefirst - datesecond)
  return Math.ceil(calculatedifference / (1000 * 60 * 60 * 24))
}
export const PercentageConvertation = (value: number) => {
  let num: number = Number(value) // The Number() only visualizes the type and is not needed
  let roundedString: any = num.toFixed(2)
  let rounded: number = Number(roundedString) // toFixed() returns a string (often suitable for printing already)
  return rounded * 100
}
const ConvertDateFormat = (date: string) => {
  let splitteddate = date?.split("-")
  let convertedformatdate =
    splitteddate[1] + "/" + splitteddate[2] + "/" + splitteddate[0]
  return convertedformatdate
}
export const calculateDatesPositioning = (
  startDate: Date,
  endDate: Date,
  PlannedEndDate: Date,
  timeDifferenceBetweenPlannedDateAndEndDate: number,
  progressOfProject: number,
  progressOfTime: number
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
  if (diffplannedandEnddate > 0) {
    isexpired = false
    // if not expired do something
    fullWidthGray = 100
    fullWidth = diffstartdateenddate / diffstartdateplannedenddate
    fullWidth = PercentageConvertation(fullWidth)
    firstline = (100 * PercentageConvertation(progressOfTime)) / fullWidth
    secondlineWidth = fullWidth - Math.round(firstline)

    if (progressOfProject > 1) {
      progressofproject = 100
    } else {
      progressofproject =
        (100 * PercentageConvertation(progressOfProject)) / fullWidth
    }

    diffstartdateplannedenddate = 99
  } else if (diffplannedandEnddate <= 0) {
    //if date expired do something
    isexpired = true
    fullWidth = 100
    firstline = (100 * PercentageConvertation(progressOfTime)) / fullWidth
    secondlineWidth = fullWidth - Math.round(firstline)

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

const CleanTypeOfData = (projecttype: string) => {
  let stringprojectname = ""
  if (projecttype === "S") {
    stringprojectname = "Step By Step"
  } else if (projecttype === "All") {
    //pass
  } else if (projecttype === "Cyc") {
    //pass
  }
  return { stringprojectname }
}
const Convertpercentage = (value: number | any | undefined) => {
  let convertednumber = value * 10
  let converted = Math.round(convertednumber)
  return { converted }
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
export {
  CleanTypeOfData,
  Convertpercentage,
  ConvertDateFormat,
  LinearProgressBarCleaningData,
  calculateMilestonesPositioning
}
