import { Action, ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootStore } from "../components/redux/project/projectReducer"

export type ThunkResult<R> = ThunkAction<R, RootStore, null, any>
