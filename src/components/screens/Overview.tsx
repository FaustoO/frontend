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

const SubSubProjectGroupBox = styled.div``
interface OverviewProjectProps {
  children: JsxElement[]
}
interface LoadedDataProps {
  data: any
  key: number
}

const OverviewProject: React.FC<OverviewProjectProps> = props => {
  const [data, setData] = React.useState<any[] | null>()
  const getdata = async () => {
    await axios
      .get(`project/all/`)
      .then(res => {
        res.data.length > 0 ? setData(res.data) : setData(null)
      })
      .catch(err => prompt(err))
  }
  React.useEffect(() => {
    getdata()
  }, [])
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
        onClick={() => history.push(`/project/detail/${props.data.id}`)}
      >
        <ProjectOverviewContentBox>
          <ProjectOverviewHeaderBox>
            <ProgressBarContainer>
              <ProgressBarImage src={ProgressBar}></ProgressBarImage>
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

  return data ? (
    <>
      {data?.map((data: any, index: number) => {
        return <LoadedData data={data} key={index}></LoadedData>
      })}
    </>
  ) : (
    <h2>Project Not Created</h2>
  )
}

export default OverviewProject
