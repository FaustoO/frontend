import React from "react"
import axios from "../../functions/axios"
import { RouteComponentProps } from "react-router"
import UserLogo from "../../static/svgicon/userDefault.svg"
import IfLogo from "../../static/svgicon/iflogo.svg"
import StatusBarIcon from "../../static/svgicon/statusbar.svg"
import SearchButtonSvg from "../../static/svgicon/searchbutton.svg"
import MilestoneTabSvg from "../../static/svgicon/milestonetab.svg"
import AddIcon from "../../static/svgicon/addicon.svg"
import EditForm from "../forms/editprojectnameform"
import DatePickerForm from "../forms/datepickerForm"
import DescriptionBoxTextArea from "../forms/descriptionProjectForm"
import ClockIcon from "../../static/svgicon/clock.svg"
import threeDotImage from "../../static/svgicon/threedot.svg"
import BıgProgressIcon from "../../static/svgicon/bigprogressicon.svg"

import {
  ControlPanel,
  ControlPanelItemsContainer,
  DetailContent,
  DetailContentContainer,
  LeaftAsideContent2Image,
  LeftAside,
  LeftAsideContent2,
  LeftAsideContent2TextBox,
  LeftAsideContentBox,
  LeftAsideUserContent,
  MilestoneTabIcon,
  ProjectDetailsContainer,
  ProjectNameInputContainer,
  TopHeader,
  TopHeaderLeft,
  TopHeaderLeftBıgProgressIcon,
  TopHeaderRight,
  TopHeaderStatusBar,
  TopHeaderStatusBarContainer,
  TopHeaderTitleBox,
  UserLogoImage,
  UserNameContainer,
  MilestonesHeader,
  MilestoneHeaderText,
  MilestoneHeaderHintText,
  MilestoneAddButtonIcon,
  MilestoneAddButtonContainer,
  MilestonesWrapper,
  MilestonesBodyRoot,
  MilestonesDateContentRoot,
  MilestoneDateContentContanier,
  MilestoneDateContentLabel,
  MilestoneLeftSide,
  MilestoneGoalStatic,
  MilestoneGoalContent,
  MilestoneDateDataContent,
  MilestoneStatusBarsContentContainer,
  MilestoneEndThreeDotContainer,
  ClockIconContainer,
  MilestoneEndThreeDotImage,
  MilestoneGoalStaticsContainer,
  ClockIconImage,
  MilestoneStatusBarContentItems,
  MilestoneSearchTabIcon,
  DetailMilestonesRoot,
  DetailMilestoneContainer,
  Detail2
} from "../ui/ConstantUi"
import CircleProgressContent from "../ui/CircleProgressContent"
import { ConvertDateFormat } from "../../functions/cleaningData"
import LinearProgressBar from "../ui/LinearProgressBar"
import DragComponent from "../ui/Draggable"
import MilestoneEditComponent from "../ui/MilestoneEdit"
import { AnySoaRecord } from "dns"

export interface ProjectDetailPageProps {
  id: any
}

type Props = RouteComponentProps & ProjectDetailPageProps
const ProjectDetailPage: React.FC<Props> = props => {
  const [data, setData] = React.useState<any[] | null>()
  const [milestonesTab, setMilestonesTab] = React.useState<boolean>(false)
  const [milestoneEditTab, setMilestoneEditTab] = React.useState<boolean>(false)
  const [activeMilestoneData, setActiveMilestoneData] = React.useState<any[]>(
    []
  )
  let DraggerRef = React.useRef<React.MutableRefObject<any> | any>()
  const ChangeDraggerRef = dom => {
    console.log("checkitout", dom)
    DraggerRef = dom
  }
  const getdata = async () => {
    const state = props.match.params
    const id = (state as any)?.id
    await axios
      .get(`project/detail/${id}`)
      .then(res => {
        setData([res.data])
      })
      .catch(err => prompt(err))
  }

  const OpenEditMilestoneTab = () => {
    console.log("that runned")
    setMilestoneEditTab(true)
  }
  const getMilestoneDataInfo = (activeMilestione: any[]) => {
    setActiveMilestoneData(activeMilestione)
  }
  // React.useState(()=>{
  //   if activeMilestoneData.length>1{

  //   }

  // },[activeMilestoneData])

  const ProjectDetailContent: any = React.useCallback(() => {
    return data?.map((elm, index) => (
      <ProjectDetailsContainer ismilestoneedit={milestoneEditTab} key={index}>
        <LeftAside>
          <LeftAsideContentBox>
            {" "}
            <LeftAsideUserContent>
              {" "}
              <UserLogoImage src={UserLogo}></UserLogoImage>
              <UserNameContainer>{elm.user}</UserNameContainer>
            </LeftAsideUserContent>
            <LeftAsideContent2>
              <LeaftAsideContent2Image src={IfLogo}></LeaftAsideContent2Image>
              <LeftAsideContent2TextBox>Project</LeftAsideContent2TextBox>
            </LeftAsideContent2>
          </LeftAsideContentBox>
        </LeftAside>
        <TopHeader>
          <TopHeaderLeft>
            <CircleProgressContent
              progressvalue={
                elm.milestones.length > 0 ? elm.goalAchievingProbability : 0
              }
            ></CircleProgressContent>
          </TopHeaderLeft>
          <TopHeaderRight>
            <TopHeaderTitleBox>
              <ProjectNameInputContainer style={{ marginTop: "5px" }}>
                <EditForm
                  ismilestoneedit={false}
                  callbackFunction={getdata}
                  isnamechanged={elm.isnamechanged}
                  user={elm.user}
                  defaultValue={elm.isnamechanged === true ? elm.goal : ""}
                  typeofproject={elm.typeofproject}
                  id={elm.id}
                ></EditForm>
              </ProjectNameInputContainer>
            </TopHeaderTitleBox>

            <LinearProgressBar
              // timeDifference={elm.timeDifference}
              // plannedEndDate={elm.plannedEndDate}
              // endDate={elm.endDate}
              // progressOfTime={elm.progressOfTime}
              // progressOfProject={elm.progressOfProject}
              // startDate={elm.startDate}
              // milestones={elm.milestones}
              value={[
                elm.timeDifference,
                elm.plannedEndDate,
                elm.endDate,
                elm.progressOfTime,
                elm.progressOfProject,
                elm.startDate
              ]}
              milestones={elm.milestones}
            ></LinearProgressBar>
          </TopHeaderRight>
        </TopHeader>
        <ControlPanel>
          <ControlPanelItemsContainer>
            <MilestoneSearchTabIcon
              color={!milestonesTab ? "rgb(228, 220, 0)" : "rgb(240, 240, 255)"}
              onClick={() => {
                setMilestonesTab(false)
                setMilestoneEditTab(false)
              }}
              src={SearchButtonSvg}
            ></MilestoneSearchTabIcon>
            <MilestoneTabIcon
              color={milestonesTab ? "rgb(228, 220, 0)" : "rgb(240, 240, 255)"}
              onClick={() => {
                setMilestonesTab(true)
              }}
              src={MilestoneTabSvg}
            ></MilestoneTabIcon>
          </ControlPanelItemsContainer>
        </ControlPanel>
        <DetailContent id="DetailsRoot">
          {milestonesTab ? (
            <DetailMilestonesRoot id="MilestoneRoot">
              <DetailMilestoneContainer width={100}>
                <MilestonesHeader>
                  <MilestoneHeaderText>Milestones</MilestoneHeaderText>
                  <MilestoneHeaderHintText>
                    In this section you can manage the milestones of your
                    project
                  </MilestoneHeaderHintText>
                </MilestonesHeader>
                <MilestoneAddButtonContainer>
                  <MilestoneAddButtonIcon
                    onClick={() => addMilestoneFunction(elm.id)}
                    src={AddIcon}
                  ></MilestoneAddButtonIcon>
                </MilestoneAddButtonContainer>

                <DragComponent
                  editTab={OpenEditMilestoneTab}
                  isEditTabOpened={milestoneEditTab}
                  getMilestoneData={getMilestoneDataInfo}
                  value={[
                    elm.timeDifference,
                    elm.plannedEndDate,
                    elm.endDate,
                    elm.progressOfTime,
                    elm.progressOfProject,
                    elm.startDate,
                    elm.goal
                  ]}
                  DraggerRef={ChangeDraggerRef}
                  milestones={elm.milestones}
                  goalachiveng={
                    elm.milestones.length > 0 ? elm.goalAchievingProbability : 0
                  }
                ></DragComponent>
              </DetailMilestoneContainer>
            </DetailMilestonesRoot>
          ) : (
            <DetailContentContainer key={index}>
              {" "}
              <DatePickerForm
                callbackFunction={getdata}
                user={elm.user}
                typeofproject={elm.typeofproject}
                defaultStartData={elm.startDate}
                defaultPlannedEndData={elm.plannedEndDate}
                id={elm.id}
              ></DatePickerForm>
              <span
                style={{
                  fontFamily: "Roboto",
                  fontSize: "12px",
                  fontStyle: "normal",
                  letterSpacing: "0em",
                  color: "rgba(228, 220, 0, 1)",
                  marginBottom: "2px"
                }}
              >
                Description{" "}
              </span>
              <DescriptionBoxTextArea
                callbackFunction={getdata}
                id={elm.id}
                typeofproject={elm.typeofproject}
                user={elm.user}
                defaultValue={elm.description ? elm.description : ""}
                firstTimeChange={!elm.description ? true : false}
              ></DescriptionBoxTextArea>
            </DetailContentContainer>
          )}
        </DetailContent>
        {milestoneEditTab && (
          <Detail2>
            <DetailContentContainer>
              <MilestoneEditComponent
                projectdata={[
                  elm.timeDifference,
                  elm.plannedEndDate,
                  elm.endDate,
                  elm.progressOfTime,
                  elm.progressOfProject,
                  elm.startDate
                ]}
                goalachivevalue={
                  elm.milestones.length > 0 ? elm.goalAchievingProbability : 0
                }
                data={elm.milestones.filter(
                  elm => elm.id === activeMilestoneData[0].id
                )}
                callbackFunction={getdata}
                isOpened={milestoneEditTab}
              ></MilestoneEditComponent>
            </DetailContentContainer>
          </Detail2>
        )}
      </ProjectDetailsContainer>
    ))
  }, [data, milestoneEditTab, milestonesTab, activeMilestoneData])
  React.useEffect(() => {
    getdata()
  }, [props.match.params])

  const addMilestoneFunction = async (main_project_id: any) => {
    return await axios
      .post("project/milestones/create", {
        main_project: main_project_id
      })
      .then(res => getdata())
      .catch(err => console.log(err))
    // axios.post('milestones/create',{
    //   main_project=

    // })
  }

  return data ? (
    <ProjectDetailContent></ProjectDetailContent>
  ) : (
    <h2>404 Detailed Not Found</h2>
  )
}

export default ProjectDetailPage
