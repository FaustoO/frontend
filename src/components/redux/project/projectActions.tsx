import {
  FETCH_ALL_PROJECTS_DATA_LOADING,
  FETCH_ALL_PROJECTS_DATA_FAILURE,
  FETCH_ALL_PROJECTS_DATA_SUCCEED,
  UPDATE_PROJECT_DATA_SUCCEED,
  UPDATE_PROJECT_DATA_FAILURE,
  UPDATE_PROJECT_DATA_MILESTONE_SUCCEED,
  GET_TOTAL_UPDATE,
  CREATE_PROJECT,
  ADD_MILESTONE_TO_PROJECT,
  ProjectsDispatchTypes
} from "./projectType"
import update from "immutability-helper"
import history from "../../utulities/history"

import axios from "../../../functions/axios"
import store, { RootStore } from "./projectReducer"
import { ArrowBackIosRounded } from "@material-ui/icons"
import {
  backendDateConverter,
  dateDifference,
  getToday
} from "../../../functions/cleaningData"
import { addMilestoneIntoProject } from "../../../functions/process"
import { ThunkResult } from "../../../types/types"
import { Action, ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"

export const fetchProjectDataLoading = () => {
  return {
    type: FETCH_ALL_PROJECTS_DATA_LOADING
  }
}
export const fetchProjectDataSucceed = projects => {
  return { type: FETCH_ALL_PROJECTS_DATA_SUCCEED, payload: projects }
}
export const fetchProjectDataFailure = error => {
  return {
    type: FETCH_ALL_PROJECTS_DATA_FAILURE,
    payload: error
  }
}
export const createProjectSucceed = createdproject => {
  return {
    type: CREATE_PROJECT,
    payload: createdproject
  }
}
export const createProjectMilestoneSucceed = payloads => {
  return {
    type: ADD_MILESTONE_TO_PROJECT,
    payload: payloads
  }
}

export const updateProjectUpdatedSucceed = payloads => {
  return {
    type: UPDATE_PROJECT_DATA_SUCCEED,
    payload: payloads
  }
}
export const updateProjectUpdatedFailure = error => {
  return {
    type: UPDATE_PROJECT_DATA_FAILURE,
    payload: error
  }
}

export const fetchProjects = () => async (
  dispatch: Dispatch<ProjectsDispatchTypes>
) => {
  try {
    dispatch({
      type: FETCH_ALL_PROJECTS_DATA_LOADING
    })
    const res = await axios.get(`project/all/`)
    dispatch({
      type: FETCH_ALL_PROJECTS_DATA_SUCCEED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: FETCH_ALL_PROJECTS_DATA_FAILURE,
      payload: e.message
    })
  }
}

// return function async(dispatch) {
//   dispatch(fetchProjectDataLoading())
//   axios
//     .get(`project/all/`)
//     .then(res => {
//       dispatch(fetchProjectDataSucceed(res.data))
//     })
//     .catch(err => dispatch(fetchProjectDataFailure(err)))
// }

type MyThunkResult<R> = ThunkAction<R, RootStore, any, Action>
export const UpdateSingleProjectOrMilestoneUpdate = (
  projectid,
  key: any[],
  ismilestone?: boolean
) => async (dispatch: Dispatch<ProjectsDispatchTypes>, getState) => {
  console.log("key0", "getStateNedir", key[0], getState().projects)
  const initialState = getState().projects

  if (ismilestone) {
    try {
      const response: any = await axios.put(
        `project/detail/milestones/${projectid}`,
        key[0]
      )

      let payload = await response.data
      console.log("response.data", response.data)

      let actualprojectid = response.data.main_project

      const index = initialState.findIndex(
        project => project.id == actualprojectid
      )
      const findindexOfMilestone = initialState[index].milestones.findIndex(
        milestone => milestone.id == projectid
      )
      let promisedpayload: any = []

      promisedpayload = update(initialState, {
        [index]: {
          milestones: {
            [findindexOfMilestone]: { $set: payload }
          }
        }
      })

      dispatch({
        type: UPDATE_PROJECT_DATA_SUCCEED,
        payload: promisedpayload
      })
    } catch (error) {
      dispatch({ type: UPDATE_PROJECT_DATA_FAILURE, payload: error })
    }
  } else {
    try {
      const response: any = await axios.put(
        `project/detail/${projectid}`,
        key[0]
      )

      let payload = await response.data
      console.log("response.data", response.data)

      const index = initialState.findIndex(project => project.id == projectid)
      const findindexOfMilestone = initialState[index].milestones.findIndex(
        milestone => milestone.id == projectid
      )
      let promisedpayload: any = []
      const myproject = (promisedpayload = update(initialState, {
        [index]: { $set: payload }
      }))

      dispatch({
        type: UPDATE_PROJECT_DATA_SUCCEED,
        payload: promisedpayload
      })
    } catch (error) {
      dispatch({ type: UPDATE_PROJECT_DATA_FAILURE, payload: error })
    }
  }
  return Promise.resolve(true)
}

export const createProjectMiddleWare = (
  user,
  typeofproject,
  goalname,
  startDate,
  plannedEndDate
) => {
  return function (dispatch) {
    dispatch(fetchProjectDataLoading())
    axios
      .post("project/all/", {
        user,
        typeofproject,
        goal: goalname,
        startDate: startDate,
        plannedEndDate: plannedEndDate
      })
      .then(res => {
        dispatch(createProjectSucceed(res.data))
        history.push(`/project/detail/${res.data.id}`)
      })
      .catch(err => dispatch(updateProjectUpdatedFailure(err.message)))
  }
}
export const createProjectMilestoneMiddleWare = (
  main_project_id: any
) => async (dispatch: Dispatch<ProjectsDispatchTypes>, getState) => {
  // dispatch(fetchProjectDataLoading())
  dispatch({ type: FETCH_ALL_PROJECTS_DATA_LOADING })
  try {
    const res = await axios.post("project/milestones/create", {
      main_project: main_project_id
    })

    // console.log("newEndDate", newEndDate)
    let payloads: any[] = []
    const currentProjectIndex = getState().projects.findIndex(
      project => project.id == main_project_id
    )

    payloads = [
      ...getState().projects.slice(0, currentProjectIndex), // everything before current post
      {
        ...getState().projects[currentProjectIndex],
        milestones: [
          ...getState().projects[currentProjectIndex].milestones,
          res.data
        ]
      },
      ...getState().projects.slice(currentProjectIndex + 1)
    ]
    dispatch({ type: ADD_MILESTONE_TO_PROJECT, payload: payloads })

    // dispatch(createProjectMilestoneSucceed(payloads))

    return Promise.resolve(res)
  } catch (e) {
    dispatch({ type: UPDATE_PROJECT_DATA_FAILURE, payload: e.message })
  }
}

// export const getTotalUpdateForMilestone = projectid => {
//   return function (dispatch) {
//     let totalRelativeProgress = 0
//     let totalDuration = 0
//     let milestones = store
//       .getState()
//       .projects.find(project => project.id == projectid)
//     console.log("MİLESTONESSS", milestones)
//     let currentMilestoneuser = milestones.user
//     let curretMilestonetype = milestones.typeofproject
//     let arr: any = milestones.milestones
//     milestones.milestones.map((currentMilestoneData: any) => {
//       totalDuration += currentMilestoneData.duration
//     })
//     console.log("MİLESTONESSS2", milestones, arr, totalDuration)
//     // await milestones.milestones.map((currentMilestoneData: any) => {
//     //   totalRelativeProgress += currentMilestoneData.relativeProgress
//     // })

//     milestones.milestones.forEach((result, index) => {
//       arr[index] = {
//         id: result.id,
//         relativeProgress: result.progress * (result.duration / totalDuration)
//       }
//     })
//     console.log("MİLESTONESSS3", milestones, arr)
//     arr.forEach((result, index) => {
//       dispatch(
//         UpdateSingleProjectOrMilestoneUpdate(
//           result.id,
//           "relativeProgress",
//           result.relativeProgress,
//           true
//         )
//       )
//     })

//     arr.forEach((result, index) => {
//       totalRelativeProgress += result.relativeProgress
//     })
//     dispatch(
//       UpdateSingleProjectOrMilestoneUpdate(
//         projectid,
//         "progressOfProject",
//         totalRelativeProgress
//       )
//     )
//   }
// }
