<<<<<<< HEAD
const calculateMilestonesPositioning = list => {
  let firstOneStartDate: any = new Date()

  return Array.from(list).map((data: any, index: number) => {
    if (index === 0) {
      const convertdate = new Date(data.startDate)
      firstOneStartDate = convertdate
      return 0
    } else {
      const getDate: any = new Date(data.startDate)
      // console.log(
      //   "checkhere",
      //   getDate,
      //   getDate.getDate(),
      //   firstOneStartDate.getDate(),
      //   firstOneStartDate,
      //   getDate.getDate() - firstOneStartDate.getDate()
      // )
      const diffTime = Math.abs(getDate - firstOneStartDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > 100) {
        return undefined
      } else {
        return diffDays
      }
    }
  })
}
=======
>>>>>>> 4de63d3c83a6eb5425ccdcb167760f1e4618264d
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
<<<<<<< HEAD
const Convertpercentage = (value: number | any | undefined) => {
  let convertednumber = value * 10
  let converted = Math.round(convertednumber)
  return { converted }
}
const ConvertDateFormat = (date: string) => {
  let splitteddate = date.split("-")
  let convertedformatdate =
    splitteddate[1] + "/" + splitteddate[2] + "/" + splitteddate[0]
  return { convertedformatdate }
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
=======

export default CleanTypeOfData
>>>>>>> 4de63d3c83a6eb5425ccdcb167760f1e4618264d
