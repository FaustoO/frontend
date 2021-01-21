import React, { Component } from "react"
import { TopHeaderStatusBar, TopHeaderStatusBarContainer } from "./ConstantUi"
import StatusBarIcon from "../../static/svgicon/statusbar.svg"
import styled from "styled-components"
import SmallPointer from "../../static/svgicon/smallpointer.svg"
import BigPointer from "../../static/svgicon/bigpointer.svg"
import MilestonePointer from "../../static/svgicon/milestonepointer.svg"
import {
  calculateMilestonesPositioning,
  ConvertDateFormat
} from "../../functions/cleaningData"
import {
  Convertpercentage,
  LinearProgressBarCleaningData
} from "../../functions/cleaningData"
import { Tooltip } from "@material-ui/core"

export interface LinearProgressBarProps {
  smallSize?: boolean
  value?: any[] | any
}
const MainContainerBody = styled.div<{ small?: boolean }>`
  display: flex;

  flex-direction: row;
  ${p =>
    p.small
      ? "flex-basis: 20%; min-width: 20%;max-height: 12px;min-height: 12px;"
      : "flex-basis: 100%; min-width: 100%;max-height: 23px;min-height: 23px;"}
  background: #636380;
  flex-grow: 0;
  border-radius: 5px;
  padding: 4.19px 7px 4.27px 7px;
`
const MainContainerTop = styled.div<{ small?: boolean }>`
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
  left: ${p => p.position + "%"};
`
const BigPointerIcon = styled.img<{ position?: number; small?: boolean }>`
  position: absolute;
  cursor: pointer;
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

  return (
    <TopHeaderStatusBarContainer>
      <MainContainerTop small={props.smallSize}>
        {!props.smallSize && (
          <>
            <Tooltip
              title={`Start Date ${
                ConvertDateFormat(props.value[5]).convertedformatdate
              }`}
            >
              <SmallPointerIcon
                id="startdate"
                position={0}
                src={SmallPointer}
              ></SmallPointerIcon>
            </Tooltip>
          </>
        )}
        <Tooltip
          title={`Project Progress %${
            props.value[6].length > 1
              ? Convertpercentage(props.value[4]).converted
              : 0
          }`}
        >
          <BigPointerIcon
            small={props.smallSize}
            position={
              props.value[6].length > 1
                ? Convertpercentage(props.value[4]).converted
                : 2
            }
            src={BigPointer}
          ></BigPointerIcon>
        </Tooltip>
        {!props.smallSize && (
          <>
            <Tooltip
              title={
                LinearProgressBarCleaningData(props.value[0]).fullwithEndDate
                  ? `End Date ${
                      ConvertDateFormat(props.value[2]).convertedformatdate
                    }`
                  : `Planned End Date ${
                      ConvertDateFormat(props.value[1]).convertedformatdate
                    }`
              }
            >
              <SmallPointerIcon
                src={SmallPointer}
                position={100}
                id="enddate"
              ></SmallPointerIcon>
            </Tooltip>
            {props.value[6].length > 1 && (
              <Tooltip
                title={
                  LinearProgressBarCleaningData(props.value[0]).fullwithEndDate
                    ? `Planned End Date ${
                        ConvertDateFormat(props.value[1]).convertedformatdate
                      }`
                    : `End Date ${
                        ConvertDateFormat(props.value[2]).convertedformatdate
                      }`
                }
              >
                <PlannedAndDatePointer
                  src={SmallPointer}
                  position={
                    LinearProgressBarCleaningData(props.value[0])
                      .fullwithEndDate
                      ? 100 -
                        LinearProgressBarCleaningData(props.value[0])
                          .percentageTimeDifference
                      : Convertpercentage(props.value[3]).converted +
                        LinearProgressBarCleaningData(props.value[0])
                          .percentageTimeDifference
                  }
                  id="plannedenddate"
                ></PlannedAndDatePointer>
              </Tooltip>
            )}
          </>
        )}
      </MainContainerTop>
      <Tooltip title="100%">
        <MainContainerBody small={props.smallSize}>
          {props.value[6].length > 1 && (
            <>
              <Tooltip
                title={`${Convertpercentage(props.value[3]).converted}%`}
              >
                <FirstLine
                  width={Convertpercentage(props.value[3]).converted}
                ></FirstLine>
              </Tooltip>
              <Tooltip
                title={`${
                  LinearProgressBarCleaningData(props.value[0]).fullwithEndDate
                    ? 100 - Convertpercentage(props.value[3]).converted
                    : LinearProgressBarCleaningData(props.value[0])
                        .percentageTimeDifference
                }%`}
              >
                <SecondLine
                  width={
                    LinearProgressBarCleaningData(props.value[0])
                      .fullwithEndDate
                      ? 100 - Convertpercentage(props.value[3]).converted
                      : LinearProgressBarCleaningData(props.value[0])
                          .percentageTimeDifference
                  }
                ></SecondLine>
              </Tooltip>
            </>
          )}
        </MainContainerBody>
      </Tooltip>
      {!props.smallSize && (
        <>
          <MainContainerBottom>
            {calculateMilestonesPositioning(props.value[6]).map(
              (elm, index) => {
                return (
                  <Tooltip title={`Milestone ${index + 1}`}>
                    <MilestonesIcon
                      position={elm ? elm : 0}
                      src={MilestonePointer}
                    ></MilestonesIcon>
                  </Tooltip>
                )
              }
            )}
          </MainContainerBottom>
        </>
      )}
    </TopHeaderStatusBarContainer>
  )
}

export default LinearProgressBar
