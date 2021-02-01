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
import { ConvertDateFormat } from "../../functions/cleaningData"
import LinearProgressBar from "../ui/LinearProgressBar"

import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

interface DragComponentProps {
  goalachiveng: number
  value: any
  milestones: any
}
const DragComponent: React.FC<DragComponentProps> = props => {
  const [characters, updateCharacters] = useState(props.milestones)
  // React.useEffect(() => {
  //   console.log(props.data)
  // }, [])
  function handleOnDragEnd(result: any) {
    if (!result.destination) return
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateCharacters(items)
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
                  is_main_project
                },
                index: number
              ) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {provided => (
                      <>
                        <MilestonesWrapper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={index}
                        >
                          <MilestoneLeftSide>
                            <ClockIconContainer>
                              <ClockIconImage src={ClockIcon}></ClockIconImage>
                            </ClockIconContainer>
                            <MilestoneGoalStaticsContainer>
                              {" "}
                              <MilestoneGoalStatic>Goal</MilestoneGoalStatic>
                              <MilestoneGoalContent>
                                Type in the goal of the milestone here
                              </MilestoneGoalContent>
                            </MilestoneGoalStaticsContainer>
                          </MilestoneLeftSide>
                          <MilestonesDateContentRoot>
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
                            <MilestoneDateContentContanier>
                              <MilestoneDateContentLabel>
                                Duration
                              </MilestoneDateContentLabel>
                              <MilestoneDateDataContent>
                                {duration}
                              </MilestoneDateDataContent>
                            </MilestoneDateContentContanier>
                          </MilestonesDateContentRoot>
                          <MilestoneStatusBarsContentContainer>
                            <CircleProgressContent
                              progressvalue={props.goalachiveng}
                              smallSize
                            ></CircleProgressContent>
                            <div style={{ display: "flex", width: "50%" }}>
                              <LinearProgressBar
                                milestones={props.milestones}
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
                        </MilestonesWrapper>
                      </>
                    )}
                  </Draggable>
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
