import { isTypeOperatorNode } from "typescript"

export const FETCH_ALL_PROJECTS_DATA_LOADING = "FETCH_PROJECTS_DATA_LOADING"
export const FETCH_ALL_PROJECTS_DATA_SUCCEED = "FETCH_PROJECTS_DATA_SUCCEED"
export const FETCH_ALL_PROJECTS_DATA_FAILURE = "FETCH_PROJECTS_DATA_FAILURE"
export const FETCH_PROJECT_DATA_SUCCEED = "FETCH_PROJECTS_DATA_SUCCEED"
export const FETCH_PROJECT_DATA_FAILURE = "FETCH_PROJECTS_DATA_FAILURE"
export const UPDATE_PROJECT_DATA_SUCCEED = "UPDATE_PROJECT_DATA_SUCCEED"
export const UPDATE_PROJECT_DATA_FAILURE = "UPDATE_PROJECT_DATA_FAILURE"
export const UPDATE_PROJECT_DATA_MILESTONE_SUCCEED =
  "UPDATE_PROJECT_DATA_MILESTONE_SUCCEED"
export const ADD_MILESTONE_TO_PROJECT = "ADD_MILESTONE_TO_PROJECT"
export const GET_TOTAL_UPDATE = "GET_TOTAL_UPDATE"
export const CREATE_PROJECT = "CREATE_PROJECT"

export type MaınProjectTypes = ProjectType[]
export type MilestonesType = {
  id: string
  main_project: number
  duration: number
  progress: number
  relativeProgress: number
  startDate: string
  dueDate: string
  goal: string | null
  description: string | null
  goalAchievingProbability: number
  progressOfTime: number
}
export type ProjectType = {
  id: number
  user: string
  typeofproject: string
  goal: string | null
  isToplevel: boolean
  startDate: string
  plannedEndDate: string
  description: string | null
  timeDifference: number
  progressOfTime: number
  progressOfProject: number
  goalAchievingProbability: number
  endDate: string
  isnamechanged: boolean
  milestones: MilestonesType[]
}

export type Error = {
  error: string
}

export interface PROJECTLOADING {
  type: typeof FETCH_ALL_PROJECTS_DATA_LOADING
}
export interface PROJECTLOADINGFAIL {
  type: typeof FETCH_ALL_PROJECTS_DATA_FAILURE
  payload: string
}
export interface PROJECTLOADINGSUCCESS {
  type: typeof FETCH_ALL_PROJECTS_DATA_SUCCEED
  payload: ProjectType[]
}
export interface PROJECTUPDATEFAIL {
  type: typeof UPDATE_PROJECT_DATA_FAILURE
  payload: string
}

export interface PROJECTUPDATESUCCESS {
  type: typeof UPDATE_PROJECT_DATA_SUCCEED
  payload: ProjectType[]
}
export interface CREATEPROJECT {
  type: typeof CREATE_PROJECT
  payload: ProjectType
}
export interface ADDMILESTONEINTOPROJECT {
  type: typeof ADD_MILESTONE_TO_PROJECT
  payload: ProjectType[]
}

export type ProjectsDispatchTypes =
  | PROJECTLOADING
  | PROJECTLOADINGFAIL
  | PROJECTLOADINGSUCCESS
  | PROJECTUPDATESUCCESS
  | CREATEPROJECT
  | ADDMILESTONEINTOPROJECT
  | PROJECTUPDATEFAIL
