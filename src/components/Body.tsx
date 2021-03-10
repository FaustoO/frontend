import React from "react"
import { BodyContainer, MilestoneTreeViewIcon } from "./ui/ConstantUi"
import { useSelector } from "react-redux"
import { RootStore } from "./redux/project/projectReducer"
import Loading from "./ui/LoadingUI"
import ErrorBox from "./ui/ErrorBox"
export interface BodyComponentProps {}

const BodyComponent: React.FC<BodyComponentProps> = props => {
  const loading = useSelector((state: RootStore) => state.loading)
  const error = useSelector((state: RootStore) => state.error)
  return (
    <BodyContainer id="body">
      <Loading loading={loading}></Loading>
      {error && <ErrorBox error={error}></ErrorBox>}

      <>{props.children}</>
    </BodyContainer>
  )
}

export default BodyComponent
