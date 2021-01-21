import React from "react"
import { BodyContainer } from "./ui/ConstantUi"
export interface BodyComponentProps {}

const BodyComponent: React.FC<BodyComponentProps> = props => {
  return <BodyContainer>{props.children}</BodyContainer>
}

export default BodyComponent
