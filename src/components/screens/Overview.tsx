import React from "react"
import axios from "../../functions/axios"
import styled from "styled-components"
import ProgressBar from "../../static/svgicon/progressbar.svg"
import SubProjectBoxIcon from "../../static/svgicon/subprojectelement.svg"
import { useHistory } from "react-router-dom"
import { JsxElement } from "typescript"
import {
  GoalText,
  HeaderTextContainer,
  MainProjectContainer,
  ProgressBarContainer,
  ProgressBarImage,
  ProjectContentBox,
  ProjectNameContainer,
  ProjectOverviewContentBox,
  ProjectOverviewHeaderBox,
  ProjectOverviewWrapper,
  SubProjectGroup,
  SubSubProjectBox,
  SubSubProjectItem
} from "../ui/ConstantUi"
import CircleProgressContent from "../ui/CircleProgressContent"
import { useSelector, useDispatch } from "react-redux"
import { fetchProjects } from "../redux/project/projectActions"
import { RootStore } from "../redux/project/projectReducer"
const SubSubProjectGroupBox = styled.div``
interface OverviewProjectProps {
  children: JsxElement[]
}
interface LoadedDataProps {
  data: any
  key: number
}

const OverviewProject: React.FC<OverviewProjectProps> = props => {
  const loading = useSelector((state: RootStore) => state.loading)
  const projects = useSelector((state: RootStore) => state.projects)
  const error = useSelector((state: RootStore) => state.error)

  console.log("all projects", projects)
  const history = useHistory()
  const LoadedData = (props: LoadedDataProps) => {
    const [onMouse, setOnMouse] = React.useState<boolean>(false)
    return (
      <ProjectOverviewWrapper
        onMouseEnter={() => setOnMouse(true)}
        onMouseLeave={() => {
          setOnMouse(false)
        }}
        id={props.data.id}
        mouseOver={onMouse}
        key={props.key}
        onClick={() => {
          history.push(`/project/detail/${props.data.id}`)
        }}
      >
        <ProjectOverviewContentBox>
          <ProjectOverviewHeaderBox>
            <ProgressBarContainer>
              <CircleProgressContent
                smallSize
                mediumSize
                progressvalue={props.data.goalAchievingProbability}
              ></CircleProgressContent>
            </ProgressBarContainer>
            <HeaderTextContainer>
              <GoalText>Goal</GoalText>
              <ProjectNameContainer>
                {props.data.isnamechanged === true
                  ? props.data.goal
                  : "Project #" + props.data.id}
              </ProjectNameContainer>
            </HeaderTextContainer>
          </ProjectOverviewHeaderBox>
          <ProjectContentBox>
            <MainProjectContainer>
              <SubSubProjectBox>
                <SubProjectGroup>
                  <SubSubProjectItem
                    src={SubProjectBoxIcon}
                  ></SubSubProjectItem>
                  <SubSubProjectItem
                    src={SubProjectBoxIcon}
                  ></SubSubProjectItem>
                </SubProjectGroup>
                <SubProjectGroup>
                  <SubSubProjectItem
                    src={SubProjectBoxIcon}
                  ></SubSubProjectItem>
                  <SubSubProjectItem
                    src={SubProjectBoxIcon}
                  ></SubSubProjectItem>
                </SubProjectGroup>
              </SubSubProjectBox>
            </MainProjectContainer>
          </ProjectContentBox>
        </ProjectOverviewContentBox>
      </ProjectOverviewWrapper>
    )
  }

  return loading ? (
    <div></div>
  ) : projects.length > 0 ? (
    <>
      {projects.map((data: any, index: number) => {
        return <LoadedData data={data} key={index}></LoadedData>
      })}
    </>
  ) : error ? (
    <div></div>
  ) : (
    <h2>Project Not Created</h2>
  )
}

export default OverviewProject
