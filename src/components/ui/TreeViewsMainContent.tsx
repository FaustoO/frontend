import { Box } from "@material-ui/core"
import SquaredProgress from "./SquaredProgress"
import React from "react"
import styled from "styled-components"
import {
  PercentageConvertation,
  useContainerDimensions
} from "../../functions/cleaningData"
export interface TreeViewMainContentComponentProps {
  milestones: any[]
  getMilestoneData: ([]) => void
  OpenEditMilestoneTab: (
    target: any,
    isTreeview?: boolean,
    insideTreeView?: boolean
  ) => void
  closeDialog: () => void
}

const ProjectArea = styled.div<{ maxheight: any; mouseOver: boolean }>`
  display: flex;
  width: 95%;
  padding: 5px 0 5px 0px;
  max-width: 95%;
  height: auto !important;
  max-height: ${p => p.maxheight + "px"};
  border: ${p =>
    p.mouseOver
      ? "3px solid rgba(228, 220, 0, 1)"
      : "3px solid rgba(240, 240, 255, 0.1)"};
  background: rgba(99, 99, 128, 0.1);
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  align-self: center;
  cursor: pointer;
`
const AllMilestonesPlusGaps = styled.div<{
  maxWidth: number
  maxheight?: number
}>`
  height: "100%";
  max-height: ${p => p.maxheight + "px"};
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${p => p.maxWidth + "px"} !important;
  align-items: center;
`
const TreeViewMainContentComponent: React.FC<TreeViewMainContentComponentProps> = props => {
  const [maxWidth, setMaxWidth] = React.useState<number>(95)
  const [
    mouseOverProjectArea,
    setMouseOverProjectArea
  ] = React.useState<boolean>(false)
  const ProjectAreaWidthRef = React.useRef<any>(null)
  const AllMilestonesPlusGapsWidthRef = React.useRef<any>(null)

  const AllMilestonesPlusGapsWidth = useContainerDimensions(
    AllMilestonesPlusGapsWidthRef
  ).width
  const AllMilestonesPlusGapsHeight = useContainerDimensions(
    AllMilestonesPlusGapsWidthRef
  ).height

  const widthOfProjectArea = useContainerDimensions(ProjectAreaWidthRef).width
  const heightOfProjectArea = useContainerDimensions(ProjectAreaWidthRef).height
  const SquaredProgressCallBack: any = React.useCallback(() => {
    return (
      <ProjectArea
        mouseOver={mouseOverProjectArea}
        onClick={e => {
          props.OpenEditMilestoneTab("NoMilestone", true, false)
          props.closeDialog()
        }}
        onMouseEnter={() => {
          setMouseOverProjectArea(true)
        }}
        onMouseLeave={() => {
          setMouseOverProjectArea(false)
        }}
        maxheight={
          props.milestones.length == 1
            ? "fit-content"
            : ((widthOfProjectArea * 0.95 * 0.9) / props.milestones.length) *
              1.2
        }
        ref={ProjectAreaWidthRef}
        id="projectareaWidth"
      >
        <AllMilestonesPlusGaps
          id="allmilestoneswithgaps"
          maxheight={
            (widthOfProjectArea * 0.95 * 0.9) / props.milestones.length
          }
          ref={AllMilestonesPlusGapsWidthRef}
          maxWidth={widthOfProjectArea * 0.95}
        >
          {props.milestones.map((elm, index) => {
            return (
              <SquaredProgress
                OpenEditMilestoneTab={props.OpenEditMilestoneTab}
                closeDialog={props.closeDialog}
                getMilestoneData={props.getMilestoneData}
                progressValue={PercentageConvertation(elm.progress)}
                id={elm.id}
                goal={elm.goal}
                duration={elm.duration}
                startDate={elm.startDate}
                dueDate={elm.dueDate}
                relativeProgress={elm.relativeProgress}
                goalAchievingValue={PercentageConvertation(
                  elm.goalAchievingProbability
                )}
                gaps={
                  props.milestones.length === 1
                    ? 0
                    : props.milestones[props.milestones.length - 1] ===
                      props.milestones[index]
                    ? 0
                    : (widthOfProjectArea * 0.95 * 0.1) /
                        props.milestones.length +
                      1
                }
                width={
                  props.milestones.length < 3
                    ? 500
                    : (widthOfProjectArea * 0.95 * 0.9) /
                      props.milestones.length
                }
                height={
                  props.milestones.length < 3
                    ? 500
                    : (widthOfProjectArea * 0.95 * 0.9) /
                      props.milestones.length
                }
              ></SquaredProgress>
            )
          })}{" "}
        </AllMilestonesPlusGaps>
      </ProjectArea>
    )
  }, [
    widthOfProjectArea,
    heightOfProjectArea,
    AllMilestonesPlusGapsWidth,
    AllMilestonesPlusGapsHeight,
    mouseOverProjectArea
  ])

  return (
    <>
      <SquaredProgressCallBack></SquaredProgressCallBack>
    </>
  )
}

export default TreeViewMainContentComponent
