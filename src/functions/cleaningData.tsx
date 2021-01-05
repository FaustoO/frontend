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

export default CleanTypeOfData
