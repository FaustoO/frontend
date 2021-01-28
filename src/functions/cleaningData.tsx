import { differenceInBusinessDays } from "date-fns"

const calculateMilestonesPositioning = (list, fullwidth) => {
  let firstMilestoneDueDate: any = new Date()
  let slicedlist = list.slice(0, 16)

  return Array.from(slicedlist).map((data: any, index: number) => {
    const getDate: any = new Date(data.dueDate)
    const lastelementoflist = list[list.length - 1].dueDate
    const firstelementstartdate = list[0].startDate
    const lastelementdueDate: any = new Date(lastelementoflist)
    console.log(getDate, lastelementdueDate)
    console.log("FULL WIDTH", fullwidth, Math.abs(lastelementdueDate - getDate))
    if (getDate == lastelementdueDate) {
      return fullwidth - 2
    } else {
      const diffTime = Math.abs(lastelementdueDate - getDate)
      const diffDays =
        fullwidth - 2 - Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
  })
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
  console.log(rounded * 100)
  return rounded * 100
}
const ConvertDateFormat = (date: string) => {
  let splitteddate = date.split("-")
  let convertedformatdate =
    splitteddate[1] + "/" + splitteddate[2] + "/" + splitteddate[0]
  return { convertedformatdate }
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
  if (diffplannedandEnddate > 0) {
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
  } else if (diffplannedandEnddate < 0) {
    //if date expired do something

    fullWidth = 100
    console.log("chjeckkkkkkkk", progressOfTime)
    firstline = (100 * PercentageConvertation(progressOfTime)) / fullWidth
    secondlineWidth = fullWidth - Math.round(firstline)
    if (progressOfProject > 1) {
      progressofproject = (100 * PercentageConvertation(0.99)) / fullWidth
    } else {
      progressofproject =
        (100 * PercentageConvertation(progressOfProject)) / fullWidth
    }
    diffstartdateplannedenddate =
      fullWidth + timeDifferenceBetweenPlannedDateAndEndDate - 1
    fullWidthGray = diffstartdateplannedenddate
  }
  console.log(
    "lookhere",
    progressprojecttime,
    secondlineWidth,
    progressofproject,
    fullWidth,
    timeDifferenceBetweenPlannedDateAndEndDate,
    firstline,
    diffstartdateplannedenddate,
    progressOfTime,
    progressOfProject,
    0.7749999999999999 + 0.625 + 0.8 + 0.15
  )

  return {
    diffstartdateplannedenddate,
    diffstartdateenddate,
    diffplannedandEnddate,
    fullWidthGray,
    fullWidth,
    progressofproject,
    progressprojecttime,
    secondlineWidth,
    firstline
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
