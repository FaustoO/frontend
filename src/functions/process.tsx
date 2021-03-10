import {
  fetchProjects,
  UpdateSingleProjectOrMilestoneUpdate
} from "../components/redux/project/projectActions"
import { Action, ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import store, { RootStore } from "../components/redux/project/projectReducer"
import { LeftAsideContent2 } from "../components/ui/ConstantUi"
import axios from "./axios"
import {
  backendDateConverter,
  dateDifference,
  frontendDatePlus,
  getToday,
  dateDifference2,
  ConvertDateFormat,
  ConvertDateFormat2
} from "./cleaningData"
import { MilestonesType } from "../components/redux/project/projectType"

const findIDobj = (id: string, findid: string) => {
  return
}
export const durationUpdate = async (
  durationNumber: any,
  callbackFunction: any,
  currentOneid: any,
  hmm: any[],
  projectid,
  plannedEndDate
) => {
  const promises: any = []
  let currentDuration = 0
  currentDuration = durationNumber
  const arrfirst: any[] = []
  const getProject = store
    .getState()
    .projects.find(project => project.id == projectid)

  if (getProject) {
    const actualPlannedEndDate = getProject.plannedEndDate
    const actualStartDate = getProject.startDate
    const currentMilestones = getProject.milestones

    const currentMilestone: any = await currentMilestones.find(
      currentMilestone => {
        return currentMilestone.id == currentOneid
      }
    )
    let totalDurations = 0
    await currentMilestones.forEach(milestone => {
      return (totalDurations += milestone.duration)
    })

    totalDurations =
      totalDurations - currentMilestone.duration + currentDuration
    let totalRelativeProgress = 0
    totalRelativeProgress += calculateRelativeProgress(
      currentMilestone.progress,
      durationNumber,
      totalDurations
    )

    arrfirst.push({
      id: currentMilestone.id,
      startDate: backendDateConverter(currentMilestone.startDate),
      dueDate: backendDateConverter(
        frontendDatePlus(currentMilestone.startDate, currentDuration)
      ),
      duration: currentDuration,
      relativeProgress: calculateRelativeProgress(
        currentMilestone.progress,
        durationNumber,
        totalDurations
      ),

      progressOfTime: calculateProgressOfTime(
        new Date(currentMilestone.startDate),
        new Date(
          String(frontendDatePlus(currentMilestone.startDate, currentDuration))
        )
      ),

      goalAchievingProbability: calculateGoalAchievingProbability(
        calculateProgressOfTime(
          new Date(currentMilestone.startDate),
          new Date(
            String(
              frontendDatePlus(currentMilestone.startDate, currentDuration)
            )
          )
        ),
        currentMilestone.progress
      )
    })

    let getDateofFirst: string = arrfirst[0].startDate.split("-")
    let ReadyToSend = new Date(
      String(
        getDateofFirst[2] + "/" + getDateofFirst[0] + "/" + getDateofFirst[1]
      )
    )

    const WillChangeArr: any = await currentMilestones.filter(element => {
      return (
        arrfirst[0].id !== element.id &&
        ReadyToSend < new Date(String(element.startDate))
      )
    })

    let arr: any = WillChangeArr
    await WillChangeArr.forEach((item, index) => {
      if (index == 0) {
        totalRelativeProgress += calculateRelativeProgress(
          item.progress,
          item.duration,
          totalDurations
        )
        arr[index] = {
          id: item.id,
          startDate: backendDateConverter(arrfirst[0].dueDate),
          dueDate: backendDateConverter(
            frontendDatePlus(arrfirst[0].dueDate, item.duration)
          ),
          duration: item.duration,
          progressOfTime: calculateProgressOfTime(
            new Date(arrfirst[0].dueDate),
            new Date(frontendDatePlus(arrfirst[0].dueDate, item.duration))
          ),
          relativeProgress: calculateRelativeProgress(
            item.progress,
            item.duration,
            totalDurations
          ),
          goalAchievingProbability: calculateGoalAchievingProbability(
            calculateProgressOfTime(
              new Date(arrfirst[0].dueDate),
              new Date(frontendDatePlus(arrfirst[0].dueDate, item.duration))
            ),
            item.progress
          )
        }
      } else {
        totalRelativeProgress += calculateRelativeProgress(
          item.progress,
          item.duration,
          totalDurations
        )
        arr[index] = {
          id: item.id,
          startDate: backendDateConverter(arr[index - 1].dueDate),
          dueDate: backendDateConverter(
            frontendDatePlus(arr[index - 1].dueDate, item.duration)
          ),
          duration: item.duration,
          relativeProgress: calculateRelativeProgress(
            item.progress,
            item.duration,
            totalDurations
          ),
          progressOfTime: calculateProgressOfTime(
            new Date(arr[index - 1].dueDate),
            new Date(frontendDatePlus(arr[index - 1].dueDate, item.duration))
          ),
          goalAchievingProbability: calculateGoalAchievingProbability(
            calculateProgressOfTime(
              new Date(arr[index - 1].dueDate),
              new Date(frontendDatePlus(arr[index - 1].dueDate, item.duration))
            ),
            item.progress
          )
        }
      }
    })
    let endResult = arrfirst.concat(arr)

    let one: any = []
    let two: any = []
    const completeResult = endResult.forEach(async (result, index) => {
      // return await promises.push(
      //   axios.put(`project/detail/milestones/${result.id}`, {
      //     startDate: result.startDate,
      //     dueDate: result.dueDate,
      //     duration: result.duration
      //   })
      // )
      one.push(() =>
        store.dispatch(
          UpdateSingleProjectOrMilestoneUpdate(
            result.id,
            [
              {
                startDate: result.startDate,
                dueDate: result.dueDate,
                duration: result.duration,
                progressOfTime: result.progressOfTime,
                relativeProgress: result.relativeProgress,
                goalAchievingProbability: result.goalAchievingProbability
              }
            ],

            true
          )
        )
      )

      if (index == endResult.length - 1) {
        two.push(() =>
          store.dispatch(
            UpdateSingleProjectOrMilestoneUpdate(
              projectid,
              [
                {
                  endDate: result.dueDate,
                  timeDifference: Math.round(
                    dateDifference(
                      new Date(String(plannedEndDate)),
                      ConvertDateFormat2(result.dueDate)
                    )
                  ),
                  progressOfTime: calculateProgressOfTime(
                    new Date(actualStartDate),
                    ConvertDateFormat2(result.dueDate)
                  ),
                  progressOfProject: totalRelativeProgress,
                  goalAchievingProbability: calculateGoalAchievingProbability(
                    calculateProgressOfTime(
                      new Date(actualStartDate),
                      ConvertDateFormat2(result.dueDate)
                    ),
                    totalRelativeProgress
                  )
                }
              ],
              false
            )
          )
        )
      }

      if (index == endResult.length - 1) {
        two.push(() =>
          store.dispatch(
            UpdateSingleProjectOrMilestoneUpdate(
              projectid,
              [
                {
                  endDate: result.dueDate,
                  timeDifference: Math.round(
                    dateDifference(
                      new Date(String(actualPlannedEndDate)),
                      ConvertDateFormat2(result.dueDate)
                    )
                  ),
                  progressOfTime: calculateProgressOfTime(
                    new Date(actualStartDate),
                    ConvertDateFormat2(result.dueDate)
                  ),
                  goalAchievingProbability: calculateGoalAchievingProbability(
                    calculateProgressOfTime(
                      new Date(actualStartDate),
                      ConvertDateFormat2(result.dueDate)
                    ),
                    totalRelativeProgress
                  )
                }
              ],
              false
            )
          )
        )
      }
    })

    await Promise.all(one.map(promise => promise())).then(res =>
      Promise.all(two.map(promise => promise()))
    )
  }
}
export const calculateGoalAchievingProbability = (progressOfTime, progress) => {
  console.log("calculateGoalAchievingProbability", progressOfTime, progress)
  let goalAchievingProbability = 0
  if (progressOfTime === 0 && progress > 0) {
    goalAchievingProbability = 1
  } else if (progressOfTime == 0 && progress == 0) {
    goalAchievingProbability = 0
  } else if (progressOfTime > 0 && progress == 0) {
    goalAchievingProbability = 0
  } else {
    goalAchievingProbability = progress / progressOfTime
  }
  return goalAchievingProbability
}
export const calculateProgressOfTime = (startDate: Date, endDate: Date) => {
  console.log("calculateProgressOfTime", startDate, endDate)

  const today = new Date()
  let calculatedProgressOfTime = 0.0
  if (today < startDate) {
    calculatedProgressOfTime = 0.0
  } else if (today > endDate) {
    calculatedProgressOfTime = 1.0
  } else {
    if (dateDifference2(endDate, startDate) == 0) {
      calculatedProgressOfTime = dateDifference2(today, startDate)
    } else {
      calculatedProgressOfTime =
        dateDifference2(today, startDate) / dateDifference2(endDate, startDate)
    }
  }
  return calculatedProgressOfTime
}
export const calculateRelativeProgress = (
  progress: number,
  duration: number,
  totalduration: number
) => {
  let relativeProgress: number = 0
  relativeProgress = progress * (duration / totalduration)

  return relativeProgress
}
export const dueDateUpdate = async (
  newDueDate: any,
  callbackFunction: any,
  currentOneid: any,
  hmm: any[],
  projectid: any,
  plannedEndDate
) => {
  const promises: any = []
  let activeData = new Date(String(backendDateConverter(newDueDate)))
  const arrfirst: any[] = []
  // var diff = Math.abs(date1 - date2);
  const getProject = store
    .getState()
    .projects.find(project => project.id == projectid)
  if (getProject) {
    const actualPlannedEndDate = getProject.plannedEndDate
    const actualStartDate = getProject.startDate
    const currentMilestones = getProject.milestones
    const currentMilestone: any = await currentMilestones.find(
      currentMilestone => {
        return currentMilestone.id == currentOneid
      }
    )
    let totalDurations = 0
    await currentMilestones.forEach(milestone => {
      return (totalDurations += milestone.duration)
    })

    let activeNewDueDate = new Date(String(newDueDate))
    console.log("activeNewDueDate", activeNewDueDate)
    const durationcalculated: any = dateDifference(
      activeNewDueDate,
      currentMilestone.startDate
    )
    totalDurations =
      totalDurations - currentMilestone.duration + durationcalculated
    let totalRelativeProgress = 0
    totalRelativeProgress += calculateRelativeProgress(
      currentMilestone.progress,
      durationcalculated,
      totalDurations
    )
    let calculatedTimeDifference: any = 0

    arrfirst.push({
      id: currentMilestone.id,
      startDate: backendDateConverter(currentMilestone.startDate),
      dueDate: backendDateConverter(newDueDate),
      duration: durationcalculated,
      relativeProgress: calculateRelativeProgress(
        currentMilestone.progress,
        durationcalculated,
        totalDurations
      ),
      progressOfTime: calculateProgressOfTime(
        new Date(currentMilestone.startDate),
        activeNewDueDate
      ),
      goalAchievingProbability: calculateGoalAchievingProbability(
        calculateProgressOfTime(
          new Date(currentMilestone.startDate),
          activeNewDueDate
        ),
        currentMilestone.progress
      )
    })

    const willchangearr: any = currentMilestones.filter(element => {
      return (
        arrfirst[0].id !== element.id &&
        new Date(currentMilestone.startDate) <
          new Date(String(element.startDate))
      )
    })

    let arr: any = willchangearr
    await willchangearr.forEach((item, index) => {
      if (index == 0) {
        totalRelativeProgress += calculateRelativeProgress(
          item.progress,
          item.duration,
          totalDurations
        )
        arr[index] = {
          id: item.id,
          startDate: backendDateConverter(newDueDate),
          dueDate: backendDateConverter(
            frontendDatePlus(newDueDate, item.duration)
          ),
          duration: item.duration,
          progressOfTime: calculateProgressOfTime(
            new Date(frontendDatePlus(newDueDate, item.duration)),
            new Date(backendDateConverter(newDueDate))
          ),
          relativeProgress: calculateRelativeProgress(
            item.progress,
            item.duration,
            totalDurations
          ),
          goalAchievingProbability: calculateGoalAchievingProbability(
            calculateProgressOfTime(
              new Date(frontendDatePlus(newDueDate, item.duration)),
              new Date(backendDateConverter(newDueDate))
            ),
            item.progress
          )
        }
      } else {
        totalRelativeProgress += calculateRelativeProgress(
          item.progress,
          item.duration,
          totalDurations
        )
        arr[index] = {
          id: item.id,
          startDate: backendDateConverter(arr[index - 1].dueDate),
          dueDate: backendDateConverter(
            frontendDatePlus(arr[index - 1].dueDate, item.duration)
          ),
          duration: item.duration,
          relativeProgress: calculateRelativeProgress(
            item.progress,
            item.duration,
            totalDurations
          ),
          progressOfTime: calculateProgressOfTime(
            new Date(arr[index - 1].dueDate),
            new Date(frontendDatePlus(arr[index - 1].dueDate, item.duration))
          ),
          goalAchievingProbability: calculateGoalAchievingProbability(
            calculateProgressOfTime(
              new Date(arr[index - 1].dueDate),
              new Date(frontendDatePlus(arr[index - 1].dueDate, item.duration))
            ),
            item.progress
          )
        }
      }
    })
    let endResult = await arrfirst.concat(arr)
    let one: any = []
    let two: any = []

    const completeResult = endResult.forEach(async (result, index) => {
      // promises.push(
      //   axios.put(`project/detail/milestones/${result.id}`, {
      //     startDate: result.startDate,
      //     dueDate: result.dueDate,
      //     duration: result.duration
      //   })
      // )
      one.push(() =>
        store.dispatch(
          UpdateSingleProjectOrMilestoneUpdate(
            result.id,
            [
              {
                startDate: result.startDate,
                dueDate: result.dueDate,
                duration: result.duration,
                progressOfTime: result.progressOfTime,
                relativeProgress: result.relativeProgress,
                goalAchievingProbability: result.goalAchievingProbability
              }
            ],
            true
          )
        )
      )
      if (index == endResult.length - 1) {
        two.push(() =>
          store.dispatch(
            UpdateSingleProjectOrMilestoneUpdate(
              projectid,
              [
                {
                  endDate: result.dueDate,
                  timeDifference: Math.round(
                    dateDifference(
                      new Date(String(actualPlannedEndDate)),
                      ConvertDateFormat2(result.dueDate)
                    )
                  ),
                  progressOfTime: calculateProgressOfTime(
                    new Date(String(actualStartDate)),
                    ConvertDateFormat2(result.dueDate)
                  ),
                  goalAchievingProbability: calculateGoalAchievingProbability(
                    calculateProgressOfTime(
                      new Date(String(actualStartDate)),
                      ConvertDateFormat2(result.dueDate)
                    ),
                    totalRelativeProgress
                  )
                }
              ],
              false
            )
          )
        )
      }
    })
    await Promise.all(one.map(promise => promise())).then(res => {
      Promise.all(two.map(promise => promise()))
    })
  }
}

export const addMilestoneIntoProject = async (
  projectid,
  startDate,
  dueDate,
  duration
) => {
  const project_id = projectid
  const getProject = store
    .getState()
    .projects.find(project => project.id == project_id)
  if (getProject) {
    const projectPlannedEndDate = getProject.plannedEndDate
    const projectStartDate = getProject.startDate
    const projectMilestones = getProject.milestones
    const milestones: any[] = []
    let totalDuration = 0
    let totalRelativeProgress = 0

    const newObjStartDate = startDate
    const newObjDueDate = dueDate
    const newObjDuration = duration

    await projectMilestones.forEach(milestone => {
      totalDuration += milestone.duration
    })

    totalDuration += newObjDuration
    await projectMilestones.map(milestone => {
      totalRelativeProgress += calculateRelativeProgress(
        milestone.progress,
        milestone.duration,
        totalDuration
      )
      if (milestone.progress !== 0) {
        milestones.push({
          id: milestone.id,
          relativeProgress: calculateRelativeProgress(
            milestone.progress,
            milestone.duration,
            totalDuration
          )
        })
      }
    })

    const project = {
      endDate: backendDateConverter(newObjDueDate),
      timeDifference: dateDifference(
        new Date(projectPlannedEndDate),
        new Date(newObjDueDate)
      ),
      progressOfTime: calculateProgressOfTime(
        new Date(projectStartDate),
        new Date(newObjDueDate)
      ),
      progressOfProject: totalRelativeProgress,
      goalAchievingProbability: calculateGoalAchievingProbability(
        calculateProgressOfTime(
          new Date(projectStartDate),
          new Date(newObjDueDate)
        ),
        totalRelativeProgress
      )
    }

    const milestonespromises: any = []
    milestones.map(milestone => {
      milestonespromises.push(
        store.dispatch(
          UpdateSingleProjectOrMilestoneUpdate(
            milestone.id,
            [
              {
                relativeProgress: milestone.relativeProgress
              }
            ],
            true
          )
        )
      )
    })
    Promise.all(milestonespromises).then(res => {
      store.dispatch(
        UpdateSingleProjectOrMilestoneUpdate(projectid, [project], false)
      )
    })
  }
}
export const changeStartDateOfProject = async (
  newstartDate,
  activePlanendEndDate,
  projectid: number
) => {
  console.log("bence okey", newstartDate, activePlanendEndDate)
  if (new Date(newstartDate) <= new Date(activePlanendEndDate)) {
    const getProject = store
      .getState()
      .projects.find(project => project.id == projectid)
    if (getProject) {
      const getProjectMilestones = getProject.milestones
      const getProjectPlannedDate = getProject.plannedEndDate
      let arr: any = []

      arr = getProjectMilestones
      let totalDurations = 0
      let totalRelativeProgress = 0
      await getProjectMilestones.forEach(milestone => {
        totalDurations += milestone.duration
      })

      await getProjectMilestones.forEach((item, index) => {
        if (index == 0) {
          totalRelativeProgress += calculateRelativeProgress(
            item.progress,
            item.duration,
            totalDurations
          )

          arr[index] = {
            id: item.id,
            startDate: backendDateConverter(newstartDate),
            dueDate: backendDateConverter(
              frontendDatePlus(newstartDate, item.duration)
            ),
            duration: item.duration,
            progressOfTime: calculateProgressOfTime(
              new Date(newstartDate),
              new Date(frontendDatePlus(newstartDate, item.duration))
            ),
            relativeProgress: calculateRelativeProgress(
              item.progress,
              item.duration,
              totalDurations
            ),
            goalAchievingProbability: calculateGoalAchievingProbability(
              calculateProgressOfTime(
                new Date(newstartDate),
                new Date(frontendDatePlus(newstartDate, item.duration))
              ),
              item.progress
            )
          }
        } else {
          totalRelativeProgress += calculateRelativeProgress(
            item.progress,
            item.duration,
            totalDurations
          )

          arr[index] = {
            id: item.id,
            startDate: backendDateConverter(arr[index - 1].dueDate),
            dueDate: backendDateConverter(
              frontendDatePlus(arr[index - 1].dueDate, item.duration)
            ),
            duration: item.duration,
            progressOfTime: calculateProgressOfTime(
              new Date(arr[index - 1].dueDate),
              new Date(frontendDatePlus(arr[index - 1].dueDate, item.duration))
            ),
            relativeProgress: calculateRelativeProgress(
              item.progress,
              item.duration,
              totalDurations
            ),
            goalAchievingProbability: calculateGoalAchievingProbability(
              calculateProgressOfTime(
                new Date(arr[index - 1].dueDate),
                new Date(
                  frontendDatePlus(arr[index - 1].dueDate, item.duration)
                )
              ),
              item.progress
            )
          }
        }
      })
      const prom1: any[] = []
      const promises2: any[] = []
      await arr.forEach((milestone, index) => {
        prom1.push(() =>
          store.dispatch(
            UpdateSingleProjectOrMilestoneUpdate(
              milestone.id,
              [
                {
                  dueDate: milestone.dueDate,
                  startDate: milestone.startDate,
                  progressOfTime: milestone.progressOfTime,
                  relativeProgress: milestone.relativeProgress,
                  goalAchievingProbability: milestone.goalAchievingProbability
                }
              ],

              true
            )
          )
        )
        if (index == arr.length - 1) {
          promises2.push(() =>
            store.dispatch(
              UpdateSingleProjectOrMilestoneUpdate(
                projectid,
                [
                  {
                    startDate: backendDateConverter(newstartDate),
                    plannedEndDate: backendDateConverter(activePlanendEndDate),
                    endDate: milestone.dueDate,
                    timeDifference: Math.round(
                      dateDifference(
                        new Date(getProjectPlannedDate),
                        ConvertDateFormat2(milestone.dueDate)
                      )
                    ),
                    progressOfProject: totalRelativeProgress,
                    progressOfTime: calculateProgressOfTime(
                      new Date(newstartDate),
                      ConvertDateFormat2(milestone.dueDate)
                    ),
                    goalAchievingProbability: calculateGoalAchievingProbability(
                      calculateProgressOfTime(
                        new Date(newstartDate),
                        ConvertDateFormat2(milestone.dueDate)
                      ),
                      totalRelativeProgress
                    )
                  }
                ],
                false
              )
            )
          )
        }
      })

      Promise.all(prom1.map(prom1 => prom1())).then(res => {
        promises2.map(prom2 => prom2())
      })
    }

    // .finally(() => getTotals(projectid))
  }

  // Get project milestone
  // update end date
  // Update project milestones startDates reorder them
}
export const progressUpdate = async (newProgress, milestoneid, projectid) => {
  const activeNewProgress = newProgress
  const currentMilestoneId = milestoneid
  const currentProjectId = projectid
  const getProject = store
    .getState()
    .projects.find(project => project.id == currentProjectId)
  if (getProject) {
    const projectProgressOfTime = getProject.progressOfTime
    const projectMilestones = getProject.milestones
    let totalDurations = 0

    await projectMilestones.forEach(milestone => {
      totalDurations += milestone.duration
    })
    let totalRelativeProgress = 0
    let willChangeMilestones = {}

    await projectMilestones.forEach(milestone => {
      if (milestone.id == currentMilestoneId) {
        totalRelativeProgress += calculateRelativeProgress(
          activeNewProgress,
          milestone.duration,
          totalDurations
        )
        willChangeMilestones = {
          id: milestone.id,
          progress: activeNewProgress,
          relativeProgress: calculateRelativeProgress(
            activeNewProgress,
            milestone.duration,
            totalDurations
          )
        }
      } else {
        if (milestone.progress !== 0) {
          totalRelativeProgress += milestone.relativeProgress
        }
      }
    })

    const mainProject = {
      progressOfProject: totalRelativeProgress,
      goalAchievingProbability: calculateGoalAchievingProbability(
        projectProgressOfTime,
        totalRelativeProgress
      )
    }

    Promise.all([
      store.dispatch(
        UpdateSingleProjectOrMilestoneUpdate(
          currentMilestoneId,
          [willChangeMilestones],
          true
        )
      )
    ]).then(res => {
      store.dispatch(
        UpdateSingleProjectOrMilestoneUpdate(
          currentProjectId,
          [mainProject],
          false
        )
      )
    })
  }
}
export const reOrderProcess = async (
  project_id,
  oldArr: MilestonesType[],
  newArr: MilestonesType[]
) => {
  let arr: any = oldArr
  const getProject = store
    .getState()
    .projects.find(project => project.id == project_id)

  if (getProject) {
    oldArr.forEach((olditem, index) => {
      if (newArr[index].startDate !== oldArr[index].startDate) {
        if (index == 0) {
          arr[index] = {
            id: newArr[index].id,
            startDate: backendDateConverter(getProject.startDate),
            dueDate: backendDateConverter(
              frontendDatePlus(getProject.startDate, newArr[index].duration)
            ),
            progressOfTime: calculateProgressOfTime(
              new Date(getProject.startDate),
              new Date(
                frontendDatePlus(getProject.startDate, newArr[index].duration)
              )
            ),
            goalAchievingProbability: calculateGoalAchievingProbability(
              calculateProgressOfTime(
                new Date(getProject.startDate),
                new Date(
                  frontendDatePlus(getProject.startDate, newArr[index].duration)
                )
              ),
              newArr[index].progress
            )
          }
        } else {
          arr[index] = {
            id: newArr[index].id,
            startDate: backendDateConverter(arr[index - 1].dueDate),
            dueDate: backendDateConverter(
              frontendDatePlus(arr[index - 1].dueDate, newArr[index].duration)
            ),
            progressOfTime: calculateProgressOfTime(
              new Date(arr[index - 1].dueDate),
              new Date(
                frontendDatePlus(arr[index - 1].dueDate, newArr[index].duration)
              )
            ),
            goalAchievingProbability: calculateGoalAchievingProbability(
              calculateProgressOfTime(
                new Date(arr[index - 1].dueDate),
                new Date(
                  frontendDatePlus(
                    arr[index - 1].dueDate,
                    newArr[index].duration
                  )
                )
              ),
              newArr[index].progress
            )
          }
        }
      } else {
        if (index == 0) {
          arr[index] = {
            id: oldArr[index].id,
            startDate: backendDateConverter(oldArr[index].startDate),
            dueDate: backendDateConverter(oldArr[index].dueDate),

            progressOfTime: calculateProgressOfTime(
              new Date(backendDateConverter(oldArr[index].startDate)),
              new Date(backendDateConverter(oldArr[index].dueDate))
            ),
            goalAchievingProbability: calculateGoalAchievingProbability(
              calculateProgressOfTime(
                new Date(backendDateConverter(oldArr[index].startDate)),
                new Date(backendDateConverter(oldArr[index].dueDate))
              ),
              oldArr[index].progress
            )
          }
        } else {
          arr[index] = {
            id: oldArr[index].id,
            startDate: backendDateConverter(arr[index - 1].dueDate),
            dueDate: backendDateConverter(
              frontendDatePlus(arr[index - 1].dueDate, newArr[index].duration)
            ),
            progressOfTime: calculateProgressOfTime(
              new Date(backendDateConverter(arr[index - 1].dueDate)),
              new Date(
                frontendDatePlus(arr[index - 1].dueDate, newArr[index].duration)
              )
            ),
            goalAchievingProbability: calculateGoalAchievingProbability(
              calculateProgressOfTime(
                new Date(backendDateConverter(arr[index - 1].dueDate)),
                new Date(
                  frontendDatePlus(
                    arr[index - 1].dueDate,
                    newArr[index].duration
                  )
                )
              ),
              oldArr[index].progress
            )
          }
        }
      }
    })
    let promises: any[] = []
    arr.map((result, index) => {
      promises.push(() =>
        store.dispatch(
          UpdateSingleProjectOrMilestoneUpdate(
            result.id,
            [
              {
                startDate: result.startDate,
                dueDate: result.dueDate,
                progressOfTime: result.progressOfTime,
                goalAchievingProbability: result.goalAchievingProbability
              }
            ],
            true
          )
        )
      )
    })
    await Promise.all(promises.map(promise => promise())).then(res => {
      store.dispatch(fetchProjects())
    })
  }
}
