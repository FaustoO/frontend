import React from "react"
import styled from "styled-components"
export interface BodyComponentProps {}
const BodyContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px;
    margin-right: 8px;
    margin-left: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(240, 240, 255, 1);

    width: 100%;
    height: 100%;
    max-width: 7px;
    max-height: 11px;
    border-radius: 5px;
  }
`
const BodyComponent: React.FC<BodyComponentProps> = props => {
  return <BodyContainer>{props.children}</BodyContainer>
}

export default BodyComponent
