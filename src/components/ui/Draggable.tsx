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
  MilestoneStatusBarContentItems
} from "../ui/ConstantUi"
import CircleProgressContent from "../ui/CircleProgressContent"
import {
  backendDateConverter,
  ConvertDateFormat,
  PercentageConvertation,
  truncate,
  frontendDatePlus
} from "../../functions/cleaningData"
import LinearProgressBar from "../ui/LinearProgressBar"
import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import axios from "../../functions/axios"
import { zIndex } from "material-ui/styles"
import { useDispatch } from "react-redux"
import { UpdateSingleProjectOrMilestoneUpdate } from "../redux/project/projectActions"
import {
  calculateGoalAchievingProbability,
  calculateRelativeProgress
} from "../../functions/process"
import { MilestonesType } from "../redux/project/projectType"
import { reOrderProcess } from "../../functions/process"
interface DragComponentProps {
  goalachiveng: number
  value: any
  milestones: any
  editTab: (target) => void
  getMilestoneData: (activeMilestione: any[]) => void
  isEditTabOpened: boolean
  DraggerRef: any
  callbackFunction: any
  selectedTab: string | any
  scrollPosition: any
}
interface DragWrapperComponent {
  id: any
  goal: any
  duration: any
  index: any
  relativeProgress: any
  startDate: any
  dueDate: any
  progress: any
  editTab: any
  getMilestoneData: any
  isEditTabOpened: any
  goalachiveng: any
  milestones: any
  value: any
  progressoftime: any
  style?: React.CSSProperties
}
const DragComponent: React.FC<DragComponentProps> = props => {
  const [characters, updateCharacters] = React.useState(props.milestones)
  const DraggableRef = React.useRef<any>(null)
  const dispatch = useDispatch()
  // React.useEffect(() => {
  //   console.log(props.data)
  // }, [])

  function handleOnDragEnd(result: any) {
    if (!result.destination) return
    const items: any[] = Array.from(characters)
    const items2: any[] = Array.from(characters)

    const [reorderedItem]: any[] = items.splice(result.source.index, 1)

    items.splice(result.destination.index, 0, reorderedItem)

    updateCharacters(items)
    orderHandle(items, items2)
  }
  const orderHandle = async (
    newarray: MilestonesType[],
    oldarray: MilestonesType[]
  ) => {
    // let arr: any = oldarray
    reOrderProcess(props.value[7], oldarray, newarray)

    // const checkthisone = oldarray.map((olditem, index) => {
    //   console.log("just olds", olditem.startDate)
    //   newarray.map((newitem: any, index) => {
    //     console.log(newitem.startDate, olditem.startDate)
    //     if (olditem.startDate !== newitem.startDate) {
    //       console.log("this is changed", newitem.goal, newitem.id)
    //       return arr.push(newitem)
    //     }
    //   })
    //   return arr
    // })

    // var arr = newarray

    // newarray.forEach(function (item, index) {
    //   arr[index] = {
    //     id: item.id,
    //     position: index,
    //     goal: item.goal
    //   }
    // })
    // arr.map(async (readytosendeddata, index) => {
    //   console.log(
    //     "id",
    //     readytosendeddata.id,
    //     "position",
    //     readytosendeddata.position
    //   )
    //   await axios
    //     .put(`project/detail/milestones/${readytosendeddata.id}`, {
    //       position: readytosendeddata.position
    //     })
    //     .then(res => console.log(res.data))
    // })

    // const checkitout = oldarray.forEach(
    //   elm => (elm.startDate = newarray.map(newelm => newelm.startDate))
    // )
    // console.log("checkher", checkitout)

    // await axios
    //   .put(`project/detail/milestones/${props.milestoneid}`, {
    //     goal:
    //       activeProjectName.charAt(0).toUpperCase() + activeProjectName.slice(1)
    //   })
    //   .then(res => {
    //     props.callbackFunction()
    //   })
    //   .catch(err => prompt(err))
  }
  let letdefaultopen = false

  const iseditTabCallbackFunction = React.useCallback(() => {
    if (props.isEditTabOpened) {
      let getSelected = document.getElementById(props.selectedTab)
      getSelected!.style.border = "3px solid rgba(228, 220, 0, 1)"
      document
        .getElementsByClassName("characters")[0]
        .scrollTo(0, props.scrollPosition)
    } else {
      if (props.selectedTab) {
        let getSelected = document.getElementById(props.selectedTab)
        getSelected!.style.border = " "
      }
      document
        .getElementsByClassName("characters")[0]
        .scrollTo(0, props.scrollPosition)
    }
  }, [props.isEditTabOpened])

  React.useEffect(() => {
    iseditTabCallbackFunction()
  }, [])

  const WrapperComponent: React.FC<DragWrapperComponent> = ({
    id,
    goal,
    duration,
    index,
    relativeProgress,
    startDate,
    dueDate,
    progress,
    editTab,
    getMilestoneData,
    isEditTabOpened,
    goalachiveng,
    milestones,
    value,
    progressoftime,
    style
  }) => {
    const [onMouse, setOnMouse] = React.useState<boolean>(false)
    const onMouseOverWrapper = () => {
      setOnMouse(true)
    }
    const onMouseLeaveWrapper = () => {
      setOnMouse(false)
    }
    return (
      <Draggable key={id} draggableId={id} index={index}>
        {provided => (
          <>
            <MilestonesWrapper
              onMouseEnter={onMouseOverWrapper}
              onMouseLeave={onMouseLeaveWrapper}
              mouseOver={onMouse}
              id={`${"milestonewrapper" + id}`}
              onClick={e => {
                props.editTab(e.currentTarget)

                props.getMilestoneData([
                  {
                    id,
                    goal,
                    duration,
                    startDate: ConvertDateFormat(startDate),
                    dueDate: ConvertDateFormat(dueDate),
                    progress: PercentageConvertation(progress),
                    relativeProgress: PercentageConvertation(relativeProgress)
                  }
                ])
              }}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={id}
            >
              <MilestoneLeftSide>
                <ClockIconContainer>
                  <ClockIconImage src={ClockIcon}></ClockIconImage>
                </ClockIconContainer>
                <MilestoneGoalStaticsContainer>
                  {" "}
                  <MilestoneGoalStatic>Goal</MilestoneGoalStatic>
                  <MilestoneGoalContent>
                    {goal
                      ? truncate(goal, 26, 32)
                      : "Type your milestone goal here..."}
                  </MilestoneGoalContent>
                </MilestoneGoalStaticsContainer>
              </MilestoneLeftSide>
              <MilestonesDateContentRoot
                isEditTapOpened={props.isEditTabOpened}
              >
                <MilestoneDateContentContanier>
                  <MilestoneDateContentLabel>
                    Start Date
                  </MilestoneDateContentLabel>
                  <MilestoneDateDataContent>
                    {ConvertDateFormat(startDate)}
                  </MilestoneDateDataContent>
                </MilestoneDateContentContanier>
                <MilestoneDateContentContanier>
                  <MilestoneDateContentLabel>
                    End Date
                  </MilestoneDateContentLabel>
                  <MilestoneDateDataContent>
                    {ConvertDateFormat(dueDate)}
                  </MilestoneDateDataContent>
                </MilestoneDateContentContanier>
                {!props.isEditTabOpened && (
                  <MilestoneDateContentContanier>
                    <MilestoneDateContentLabel>
                      Duration
                    </MilestoneDateContentLabel>
                    <MilestoneDateDataContent>
                      {duration}
                    </MilestoneDateDataContent>
                  </MilestoneDateContentContanier>
                )}
              </MilestonesDateContentRoot>
              {!props.isEditTabOpened && (
                <>
                  <MilestoneStatusBarsContentContainer>
                    <CircleProgressContent
                      progressvalue={goalachiveng}
                      smallSize
                    ></CircleProgressContent>
                    <div style={{ display: "flex", width: "50%" }}>
                      <LinearProgressBar
                        milestones={props.milestones}
                        milestoneprogressOfTime={progressoftime}
                        milestoneprogress={progress}
                        milestonestartdate={startDate}
                        milestoneeduedate={dueDate}
                        isMilestoneEditTab
                        value={props.value}
                        smallSize
                      ></LinearProgressBar>
                    </div>
                  </MilestoneStatusBarsContentContainer>
                  <MilestoneEndThreeDotContainer>
                    <MilestoneEndThreeDotImage
                      src={threeDotImage}
                    ></MilestoneEndThreeDotImage>
                  </MilestoneEndThreeDotContainer>
                </>
              )}
            </MilestonesWrapper>
          </>
        )}
      </Draggable>
    )
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {provided => (
          <MilestonesBodyRoot
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {characters.map(
              (
                {
                  id,
                  duration,
                  progress,
                  relativeProgress,
                  startDate,
                  dueDate,
                  is_main_project,
                  goal,
                  goalAchievingProbability,
                  progressOfTime
                },
                index: number
              ) => {
                return (
                  <WrapperComponent
                    id={id}
                    dueDate={dueDate}
                    progress={progress}
                    relativeProgress={relativeProgress}
                    duration={duration}
                    startDate={startDate}
                    goal={goal}
                    editTab={props.editTab}
                    index={index}
                    progressoftime={progressOfTime}
                    getMilestoneData={props.getMilestoneData}
                    goalachiveng={goalAchievingProbability}
                    isEditTabOpened={props.isEditTabOpened}
                    milestones={props.milestones}
                    value={props.value}
                    key={id}
                  ></WrapperComponent>
                )
              }
            )}
            {provided.placeholder}
          </MilestonesBodyRoot>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragComponent
