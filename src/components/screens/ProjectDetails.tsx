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
import CloseMilestonEditTabIcon from "../../static/svgicon/closemilestonetab.svg"
import TreeViewSvgIcon from "../../static/svgicon/treeviewlogo.svg"

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
  Detail2,
  MilestoneCloseEditTabIcon,
  MilestoneTreeViewIcon
} from "../ui/ConstantUi"
import CircleProgressContent from "../ui/CircleProgressContent"
import { ConvertDateFormat, dateDifference } from "../../functions/cleaningData"
import LinearProgressBar from "../ui/LinearProgressBar"
import DragComponent from "../ui/Draggable"
import MilestoneEditComponent from "../ui/MilestoneEdit"
import { AnySoaRecord } from "dns"
import TreeViewComponent from "../ui/TreeViewComponent"
import store, {
  RootStore,
  ThunkDispatchType
} from "../redux/project/projectReducer"
import { CircularProgress } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import {
  createProjectMilestoneMiddleWare,
  UpdateSingleProjectOrMilestoneUpdate
} from "../redux/project/projectActions"
import { addMilestoneIntoProject } from "../../functions/process"
import {
  MaınProjectTypes,
  ProjectsDispatchTypes,
  ProjectType
} from "../redux/project/projectType"
import { DefaultStateI } from "../redux/project/projectReducer"
import { ThunkDispatch } from "redux-thunk"
import { Action } from "redux"
import ErrorBox from "../ui/ErrorBox"
export interface ProjectDetailPageProps {
  id: any
}

type Props = RouteComponentProps & ProjectDetailPageProps
const ProjectDetailPage: React.FC<Props> = props => {
  const [data, setData] = React.useState<any[] | null>()
  const dispatch: ThunkDispatchType = useDispatch()
  const [milestonesTab, setMilestonesTab] = React.useState<boolean>(false)
  const [milestoneEditTab, setMilestoneEditTab] = React.useState<boolean>(false)
  const [activeMilestoneData, setActiveMilestoneData] = React.useState<any[]>(
    []
  )
  const [
    isCreatingNewMilestones,
    setisCreatingNewMilestones
  ] = React.useState<boolean>(false)
  const [TreeViewOpened, setTreeViewOpened] = React.useState<boolean>(false)
  const [selectedTab, setSelectedTab] = React.useState<string | undefined>()
  const [scrollPosition, setScrollPosition] = React.useState<any>()

  let DraggerRef = React.useRef<React.MutableRefObject<any> | any>()
  const ChangeDraggerRef = dom => {
    DraggerRef = dom
  }
  const state = props.match.params
  const id = (state as any)?.id
  const project = useSelector((state: RootStore) =>
    state.projects.filter(project => project.id == id)
  )
  const projectraw = useSelector((state: RootStore) =>
    state.projects.find(project => project.id == id)
  )
  const plannedEndDate = projectraw?.plannedEndDate

  const endDate = projectraw?.endDate
  // console.log(endDate, "endDate")
  const loading = useSelector((state: RootStore) => state.loading)

  console.log("projectDetail", project)
  const getdata = () => {
    setisCreatingNewMilestones(false)
  }

  const OpenEditMilestoneTab = (
    target?: any,
    isTreeview?: boolean,
    insideTreeView?: boolean
  ) => {
    if (isTreeview && insideTreeView) {
      let topposition = 0
      let toppositionıofparent = 0
      const getWrapperElement = document.getElementById(
        `${"milestonewrapper" + target.id}`
      )

      if (getWrapperElement instanceof HTMLElement) {
        topposition = getWrapperElement.offsetTop
      }
      const getdraggableDOm = document.getElementsByClassName("characters")[0]
      if (getdraggableDOm instanceof HTMLElement) {
        toppositionıofparent = getdraggableDOm.offsetTop
      }

      setScrollPosition(topposition - toppositionıofparent)
      setSelectedTab(`${"milestonewrapper" + target.id}`)
      setMilestoneEditTab(true)
      setMilestonesTab(true)
    } else if (isTreeview && !insideTreeView) {
      setMilestoneEditTab(false)
      setMilestonesTab(false)
    } else {
      let topposition = 0
      let toppositionıofparent = 0
      const getWrapperElement = document.getElementById(target.id)

      if (getWrapperElement instanceof HTMLElement) {
        topposition = getWrapperElement.offsetTop
      }
      const getdraggableDOm = document.getElementsByClassName("characters")[0]
      if (getdraggableDOm instanceof HTMLElement) {
        toppositionıofparent = getdraggableDOm.offsetTop
      }

      setScrollPosition(topposition - toppositionıofparent)

      // setScrollPosition()
      setSelectedTab(target.id)
      setMilestoneEditTab(true)
    }
  }
  const getMilestoneDataInfo = (activeMilestione: any[]) => {
    setActiveMilestoneData(activeMilestione)
  }
  // React.useEffect(() => {
  //   console.log("All Data", data)
  // }, [data])
  // React.useState(()=>{
  //   if activeMilestoneData.length>1{

  //   }

  // },[activeMilestoneData])
  const CloseTreeView = () => {
    setTreeViewOpened(false)
  }

  const ProjectDetailContent: any = React.useCallback(() => {
    return project?.map((elm: ProjectType, index) => {
      return (
        <>
          <MilestoneTreeViewIcon
            onClick={() => {
              setTreeViewOpened(true)
            }}
            src={TreeViewSvgIcon}
            color={TreeViewOpened ? "rgb(228, 220, 0)" : ""}
          ></MilestoneTreeViewIcon>

          <TreeViewComponent
            getMilestoneData={getMilestoneDataInfo}
            milestones={elm.milestones}
            OpenEditMilestoneTab={OpenEditMilestoneTab}
            projectname={elm.goal}
            projectgoalachieveng={elm.goalAchievingProbability}
            close={CloseTreeView}
            open={TreeViewOpened}
          ></TreeViewComponent>
          <ProjectDetailsContainer
            ismilestoneedit={milestoneEditTab}
            key={index}
          >
            <LeftAside>
              <LeftAsideContentBox>
                {" "}
                <LeftAsideUserContent>
                  {" "}
                  <UserLogoImage src={UserLogo}></UserLogoImage>
                  <UserNameContainer>{elm.user}</UserNameContainer>
                </LeftAsideUserContent>
                <LeftAsideContent2>
                  <LeaftAsideContent2Image
                    src={IfLogo}
                  ></LeaftAsideContent2Image>
                  <LeftAsideContent2TextBox>Project</LeftAsideContent2TextBox>
                </LeftAsideContent2>
              </LeftAsideContentBox>
            </LeftAside>
            <TopHeader>
              <TopHeaderLeft>
                <CircleProgressContent
                  mainone
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
                      defaultValue={elm.goal ? elm.goal : ""}
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
                  color={
                    !milestonesTab ? "rgb(228, 220, 0)" : "rgb(240, 240, 255)"
                  }
                  onClick={() => {
                    setMilestonesTab(false)
                    setMilestoneEditTab(false)
                  }}
                  src={SearchButtonSvg}
                ></MilestoneSearchTabIcon>
                <MilestoneTabIcon
                  color={
                    milestonesTab ? "rgb(228, 220, 0)" : "rgb(240, 240, 255)"
                  }
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
                      {loading ? (
                        <CircularProgress
                          style={{ color: "rgb(228, 220, 0)" }}
                          disableShrink
                        />
                      ) : (
                        <MilestoneAddButtonIcon
                          onClick={async () => {
                            await addMilestoneFunction(elm.id)
                          }}
                          src={AddIcon}
                        ></MilestoneAddButtonIcon>
                      )}
                    </MilestoneAddButtonContainer>

                    <DragComponent
                      editTab={OpenEditMilestoneTab}
                      isEditTabOpened={milestoneEditTab}
                      selectedTab={selectedTab}
                      getMilestoneData={getMilestoneDataInfo}
                      value={[
                        elm.timeDifference,
                        elm.plannedEndDate,
                        elm.endDate,
                        elm.progressOfTime,
                        elm.progressOfProject,
                        elm.startDate,
                        elm.goal,
                        elm.id
                      ]}
                      DraggerRef={ChangeDraggerRef}
                      milestones={elm.milestones}
                      callbackFunction={getdata}
                      goalachiveng={
                        elm.milestones.length > 0
                          ? elm.goalAchievingProbability
                          : 0
                      }
                      scrollPosition={scrollPosition}
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
                    endDate={elm.endDate}
                    milestones={elm.milestones}
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
                <MilestoneTreeViewIcon
                  style={{
                    top: "30%",
                    right: "0"
                  }}
                  onClick={() => {
                    setTreeViewOpened(true)
                  }}
                  src={TreeViewSvgIcon}
                  color={TreeViewOpened ? "rgb(228, 220, 0)" : ""}
                ></MilestoneTreeViewIcon>
                <MilestoneCloseEditTabIcon
                  src={CloseMilestonEditTabIcon}
                  onClick={() => {
                    setMilestoneEditTab(false)
                  }}
                ></MilestoneCloseEditTabIcon>
                <DetailContentContainer id="milestoneedittabcontainer">
                  <MilestoneEditComponent
                    projectdata={[
                      elm.timeDifference,
                      elm.plannedEndDate,
                      elm.endDate,
                      elm.progressOfTime,
                      elm.progressOfProject,
                      elm.startDate
                    ]}
                    projectid={elm.id}
                    goalachivevalue={
                      elm.milestones.length > 0
                        ? elm.goalAchievingProbability
                        : 0
                    }
                    data={elm.milestones.filter(
                      elm => elm.id === activeMilestoneData[0].id
                    )}
                    callbackFunction={getdata}
                    milestones={elm.milestones}
                    isOpened={milestoneEditTab}
                  ></MilestoneEditComponent>
                </DetailContentContainer>
              </Detail2>
            )}
          </ProjectDetailsContainer>
        </>
      )
    })
  }, [project])

  React.useEffect(() => {
    getdata()
  }, [props.match.params])

  const addMilestoneFunction = async (main_project_id: any) => {
    dispatch(createProjectMilestoneMiddleWare(main_project_id)).then(
      (res: any) => {
        console.log("resadded", res)
        addMilestoneIntoProject(
          res.data.main_project,
          res.data.startDate,
          res.data.dueDate,
          res.data.duration
        )
      }
    )
    // Promise.all([
    //   dispatch(createProjectMilestoneMiddleWare(main_project_id))
    // ]).then(res => getTotals(main_project_id))
    // return await axios
    //   .post("project/milestones/create", {
    //     main_project: main_project_id
    //   })
    //   .then(res => getdata())
    //   .catch(err => console.log(err))
  }

  return project.length > 0 ? (
    <>
      <ProjectDetailContent></ProjectDetailContent>
    </>
  ) : !loading ? (
    <ErrorBox error={`404 Detailed Not Found for ${id}`}></ErrorBox>
  ) : (
    <div></div>
  )
}

export default ProjectDetailPage
