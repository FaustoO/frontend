import React, { Component } from "react"
import { TopHeaderStatusBar, TopHeaderStatusBarContainer } from "./ConstantUi"
import StatusBarIcon from "../../static/svgicon/statusbar.svg"
import styled from "styled-components"
import SmallPointer from "../../static/svgicon/smallpointer.svg"
import BigPointer from "../../static/svgicon/bigpointer.svg"
import MilestonePointer from "../../static/svgicon/milestonepointer.svg"
import {
  calculateMilestonesPositioning,
  ConvertDateFormat,
  calculateDatesPositioning
} from "../../functions/cleaningData"
import {
  Convertpercentage,
  LinearProgressBarCleaningData
} from "../../functions/cleaningData"
import { Tooltip } from "@material-ui/core"

export interface LinearProgressBarProps {
  smallSize?: boolean
  mediumSize?: boolean
  value?: any[] | any
  milestones?: []
}
const MainContainerBody = styled.div<{ small?: boolean; medium?: boolean }>`
  display: flex;

  flex-direction: row;
  ${p =>
    p.small
      ? p.medium
        ? "flex-basis: 100%; min-width: 100%;max-height: 13.18px;min-height: 13.18px;"
        : "flex-basis: 20%; min-width: 20%;max-height: 12px;min-height: 12px;"
      : "flex-basis: 100%; min-width: 100%;max-height: 23px;min-height: 23px;"}

  flex-grow: 0;
  border-radius: 5px;
`
const MainContainerGrayArea = styled.div<{ width: number }>`
  background: ${p =>
    `linear-gradient(to right, #636380 0%, #636380 ${p.width}%, transparent ${p.width}%, transparent 100%)`};
  display: flex;
  border-radius: 5px;
  width: 100%;
  padding: 4.19px 7px 4.27px 7px;
`
const MainContainerTop = styled.div<{ small?: boolean; medium?: boolean }>`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
  position: relative;
  flex-basis: 100%;
  min-width: 100%;
  flex-grow: 0;
  ${p => !p.small && "max-height: 23px;min-height: 23px;"}
  border-radius: 5px;
  padding: 4.19px 0 4.27px 0;
`
const MainContainerBottom = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  position: relative;
  flex-basis: 100%;
  min-width: 100%;
  flex-grow: 0;
  max-height: 23px;
  min-height: 23px;
  border-radius: 5px;
  padding: 4.19px 7px 4.27px 7px;
`
const MilestonesIcon = styled.img<{ position: number }>`
  position: absolute;
  cursor: pointer;
  left: ${p => p.position + "%"};
`
const FirstLine = styled.div<{ width: any }>`
  display: flex;
  flex-grow: 0;
  cursor: pointer;

  background: rgba(240, 240, 255, 0.7);
  border-radius: 5px;
  flex-basis: ${p => p.width + "%"};
  min-width: ${p => p.width + "%"};
`
const SecondLine = styled.div<{ width: any }>`
  display: flex;
  cursor: pointer;
  flex-grow: 0;
  background: rgba(228, 220, 0, 1);
  border-radius: 5px;
  flex-basis: ${p => p.width + "%"};
  min-width: ${p => p.width + "%"};
`
const SmallPointerIcon = styled.img<{ position?: number }>`
  position: absolute;
  cursor: pointer;
  z-index: 999;
  left: ${p => p.position + "%"};
`
const BigPointerIcon = styled.img<{ position?: number; small?: boolean }>`
  position: absolute;
  cursor: pointer;
  z-index: 0px;
  left: ${p => p.position + "%"};
  ${p => p.small && "width:11px;height:11px;"}
`
const PlannedAndDatePointer = styled.img<{ position?: number }>`
  position: absolute;
  cursor: pointer;
  left: ${p => p.position + "%"};
`
const LinearProgressBar: React.FC<LinearProgressBarProps> = props => {
  // React.useEffect(() => {
  //   // console.log(
  //   //   calculateMilestonesPositioning(props.value[6]),
  //   //   "progress of project",
  //   //   props.value[4],
  //   //   "progress time of project",
  //   //   props.value[3],
  //   //   props.value[6],
  //   //   Convertpercentage(props.value[3]).converted,
  //   //   LinearProgressBarCleaningData(props.value[0]).fullwithEndDate,
  //   //   LinearProgressBarCleaningData(props.value[0]).percentageTimeDifference
  //   // )
  // })
  const getLocationOnProgressBar = (expression: string) => {
    switch (expression) {
      case "progressofproject":
        // code block
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).progressofproject

      case "enddate":
        // code block
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).fullWidth
      case "GrayLine":
        return Math.round(
          calculateDatesPositioning(
            props.value[5],
            props.value[2],
            props.value[1],
            props.value[0],
            props.value[4],
            props.value[3]
          ).firstline
        )
      case "YellowLine":
        return Math.round(
          calculateDatesPositioning(
            props.value[5],
            props.value[2],
            props.value[1],
            props.value[0],
            props.value[4],
            props.value[3]
          ).secondlineWidth
        )
      case "FullWidth":
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).fullWidth
      case "Isexpired":
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).isexpired
      case "widthofGray":
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).fullWidthGray
      case "enddate-startdate":
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).diffstartdateenddate
      case "plannedenddate-startdate":
        return calculateDatesPositioning(
          props.value[5],
          props.value[2],
          props.value[1],
          props.value[0],
          props.value[4],
          props.value[3]
        ).diffstartdateplannedenddate
      default:
        return 0
      // code block
    }
  }
  React.useEffect(() => {
    console.log(getLocationOnProgressBar("progressofproject") > 100)
  }, [])
  return (
    <TopHeaderStatusBarContainer>
      <MainContainerTop small={props.smallSize}>
        {!props.smallSize && (
          <>
            <Tooltip title={`Start Date ${ConvertDateFormat(props.value[5])}`}>
              <SmallPointerIcon
                id="startdate"
                position={-1}
                src={SmallPointer}
              ></SmallPointerIcon>
            </Tooltip>
          </>
        )}
        <Tooltip
          title={`Project Progress %${
            getLocationOnProgressBar("progressofproject") >= 100
              ? 100
              : Math.round(getLocationOnProgressBar("progressofproject"))
          }`}
        >
          <BigPointerIcon
            small={props.smallSize}
            id="progressofproject"
            position={
              getLocationOnProgressBar("progressofproject") >= 100
                ? 97.5
                : getLocationOnProgressBar("progressofproject")
            }
            src={BigPointer}
          ></BigPointerIcon>
        </Tooltip>
        {!props.smallSize && (
          <>
            <Tooltip title={`End Date ${ConvertDateFormat(props.value[2])}`}>
              <SmallPointerIcon
                src={SmallPointer}
                position={
                  getLocationOnProgressBar("Isexpired")
                    ? getLocationOnProgressBar("enddate") - 1.5
                    : getLocationOnProgressBar("enddate") - 0.8
                }
                id="enddate"
              ></SmallPointerIcon>
            </Tooltip>

            {
              <Tooltip
                title={`Planned End Date ${ConvertDateFormat(props.value[1])}`}
              >
                <PlannedAndDatePointer
                  src={SmallPointer}
                  position={getLocationOnProgressBar(
                    "plannedenddate-startdate"
                  )}
                  id="plannedenddate"
                ></PlannedAndDatePointer>
              </Tooltip>
            }
          </>
        )}
      </MainContainerTop>
      <Tooltip title="100%">
        <MainContainerBody medium={props.mediumSize} small={props.smallSize}>
          {
            <>
              <MainContainerGrayArea
                width={
                  getLocationOnProgressBar("Isexpired")
                    ? getLocationOnProgressBar("widthofGray") + 1
                    : getLocationOnProgressBar("widthofGray")
                }
              >
                <Tooltip
                  title={`${Math.round(getLocationOnProgressBar("GrayLine"))}%`}
                >
                  <FirstLine
                    width={getLocationOnProgressBar("GrayLine")}
                  ></FirstLine>
                </Tooltip>
                <Tooltip title={`${getLocationOnProgressBar("YellowLine")}%`}>
                  <SecondLine
                    width={Math.round(getLocationOnProgressBar("YellowLine"))}
                  ></SecondLine>
                </Tooltip>
              </MainContainerGrayArea>
            </>
          }
        </MainContainerBody>
      </Tooltip>
      {!props.smallSize && (
        <>
          <MainContainerBottom>
            {calculateMilestonesPositioning(
              props.milestones,
              props.value[5],
              getLocationOnProgressBar("FullWidth"),
              getLocationOnProgressBar("Isexpired"),
              getLocationOnProgressBar("widthofGray"),
              getLocationOnProgressBar("enddate-startdate")
            ).map((elm, index) => {
              return (
                <Tooltip title={`Milestone ${index + 1}`}>
                  <MilestonesIcon
                    position={elm}
                    src={MilestonePointer}
                  ></MilestonesIcon>
                </Tooltip>
              )
            })}
          </MainContainerBottom>
        </>
      )}
    </TopHeaderStatusBarContainer>
  )
}

export default LinearProgressBar
