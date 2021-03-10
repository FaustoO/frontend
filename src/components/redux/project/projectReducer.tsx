import { createStore, applyMiddleware, Action } from "redux"
import thunk, { ThunkDispatch, ThunkMiddleware } from "redux-thunk"
import {
  FETCH_ALL_PROJECTS_DATA_LOADING,
  FETCH_ALL_PROJECTS_DATA_FAILURE,
  FETCH_ALL_PROJECTS_DATA_SUCCEED,
  UPDATE_PROJECT_DATA_SUCCEED,
  UPDATE_PROJECT_DATA_FAILURE,
  UPDATE_PROJECT_DATA_MILESTONE_SUCCEED,
  CREATE_PROJECT,
  ADD_MILESTONE_TO_PROJECT,
  MaınProjectTypes,
  ProjectType,
  ProjectsDispatchTypes
} from "./projectType"

import { composeWithDevTools } from "redux-devtools-extension"

export interface ProjectsInterface {
  description: string | null
  endDate: string | null
  goal: string | null
  goalAchievingProbability: number
  id: number
  isToplevel: boolean
  isnamechanged: boolean
  milestones: []
  plannedEndDate: string | null
  progressOfProject: number
  progressOfTime: number
  startDate: string
  timeDifference: number
  typeofproject: string
  user: string
}

export interface DefaultStateI {
  loading: boolean
  projects: ProjectType[]
  error: string
}
const defaultState: DefaultStateI = {
  loading: false,
  projects: [],
  error: ""
}
const ProjectReducer = (
  state: DefaultStateI = defaultState,
  action: ProjectsDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case FETCH_ALL_PROJECTS_DATA_LOADING:
      return { ...state, loading: true }
    case FETCH_ALL_PROJECTS_DATA_SUCCEED:
      return {
        loading: false,
        projects: action?.payload,
        error: ""
      }
    case FETCH_ALL_PROJECTS_DATA_FAILURE:
      return {
        loading: false,
        projects: [],
        error: action.payload
      }

    case UPDATE_PROJECT_DATA_SUCCEED:
      return {
        loading: false,
        projects: action.payload,
        error: ""
      }
    case UPDATE_PROJECT_DATA_FAILURE:
      return {
        loading: false,
        projects: [...state.projects],
        error: action.payload
      }
    case CREATE_PROJECT:
      return {
        loading: false,
        projects: [...state.projects, action.payload],
        error: ""
      }
    case ADD_MILESTONE_TO_PROJECT:
      console.log("I ADDED NEW MILESTONE INTO PROJECT")
      return {
        loading: false,
        projects: action.payload,
        error: ""
      }

    default:
      return state
  }
}
const store = createStore(
  ProjectReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk as ThunkMiddleware<RootStore, ProjectsDispatchTypes, Action>
    )
  )
)

export type RootStore = ReturnType<typeof ProjectReducer>
export type ThunkDispatchType = ThunkDispatch<
  DefaultStateI,
  Action<any>,
  ProjectsDispatchTypes
>
export default store
