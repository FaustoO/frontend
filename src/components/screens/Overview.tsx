import React from "react"
import axios from "../../functions/axios"
import styled from "styled-components"
import ProgressBar from "../../static/svgicon/progressbar.svg"
import SubProjectBoxIcon from "../../static/svgicon/subprojectelement.svg"
import { useHistory } from "react-router-dom"
const ProjectOverviewWrapper = styled.div<{ mouseOver?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
  max-height: 492px;
  min-width: 947px;
  margin-bottom: 5px;
  cursor: pointer;
  margin-right: 5px;
  overflow-y: hidden;
  max-width: 947px;
  transition: border linear 5s;
  ${p =>
    p.mouseOver ? "border: 3px solid rgba(228, 220, 0, 1)" : " border:0px"};

  border-radius: 5px;

  background: rgba(50, 50, 77, 1);
  &::-webkit-scrollbar {
    width: 7px;
    margin-right: 8px;
    margin-left: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
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
const ProjectOverviewContentBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 27px 41px 69px 48px;
  flex-direction: column;
  justify-content: space-between;
`
const ProjectOverviewHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 440px;
  justify-content: space-between;
  flex: 1;
`
const ProjectContentBox = styled.div`
  display: flex;
  flex: 4;
  flex-direction: row;
`
const ProgressBarContainer = styled.div`
  display: flex;
`
const ProgressBarImage = styled.img`
  width: 70px;
  height: 70px;
`
const MainProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: rgba(99, 99, 128, 0.1);
  border: 3px solid rgba(240, 240, 255, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  min-width: 200px;
  max-height: 52px;
  max-width: 858px;
  justify-content: flex-start;
  align-items: center;
`

const SubSubProjectBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`
const SubProjectGroup = styled.div`
  display: flex;
  width: 60px;
  justify-content: space-between;
  min-width: 30px;
`
const SubSubProjectItem = styled.img`
  width: 28px;
  height: 28px;
`
const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const GoalText = styled.div`
  display: flex;
  color: rgba(228, 220, 0, 1);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`
const ProjectNameContainer = styled.div`
  display: flex;
  color: rgba(240, 240, 255, 1);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
const SubSubProjectGroupBox = styled.div``
interface OverviewProjectProps {}

const OverviewProject: React.FC<OverviewProjectProps> = () => {
  const [onMouse, setOnMouse] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any[] | null>()
  const getdata = async () => {
    await axios
      .get(`project/all/`)
      .then(res => {
        res.data.length > 0 ? setData(res.data) : setData(null)
      })
      .catch(err => console.log(err))
  }
  React.useEffect(() => {
    getdata()
  }, [])
  const history = useHistory()

  const LoadedData: any = () => {
    return data?.map((elm, index) => (
      <ProjectOverviewWrapper
        onMouseEnter={() => setOnMouse(true)}
        onMouseLeave={() => {
          setOnMouse(false)
        }}
        id={elm.id}
        mouseOver={onMouse}
        key={index}
        onClick={() => history.push(`/project/detail/${elm.id}`)}
      >
        <ProjectOverviewContentBox>
          <ProjectOverviewHeaderBox>
            <ProgressBarContainer>
              <ProgressBarImage src={ProgressBar}></ProgressBarImage>
            </ProgressBarContainer>
            <HeaderTextContainer>
              <GoalText>Goal</GoalText>
              <ProjectNameContainer>
                {elm.isnamechanged === true ? elm.goal : "Project #" + elm.id}
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
    ))
  }

  return data ? <LoadedData></LoadedData> : <h2>Project Not Created</h2>
}

export default OverviewProject
