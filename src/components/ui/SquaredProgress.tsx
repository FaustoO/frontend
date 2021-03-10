import { Typography } from "@material-ui/core"
import styled from "styled-components"
import React from "react"
import {
  ConvertDateFormat,
  PercentageConvertation
} from "../../functions/cleaningData"
export interface SquaredProgressProps {
  goalAchievingValue: number
  width: number
  height: number
  id: string
  gaps: number
  progressValue: number
  getMilestoneData: ([]) => void
  goal: any
  duration: any
  startDate: any
  dueDate: any
  relativeProgress: any
  OpenEditMilestoneTab: (
    target: any,
    isTreeview?: boolean,
    insideTreeView?: boolean
  ) => void
  closeDialog: () => void
}
export interface SquarredActualProgresProps {
  progressValue: number
  width: number
  height: number
}

const SquaredProgressBarOutline = styled.div<{
  width: number
  height: number
  gap: number
  mouseOver: boolean
}>`
  display: flex;
  position: relative;
  margin-right: ${p => p.gap + "px"};
  width: ${p => p.width + "px"};
  height: ${p => p.height + "px"};
  box-sizing: border-box;
  border: ${p =>
    p.mouseOver
      ? "1px solid rgba(228, 220, 0, 1)"
      : "1px solid rgba(196, 196, 196, 1)"};
  cursor: pointer;
`
const SquarredProgressBarNumber = styled.p<{
  width: number
  height: number
  fontSize: number
}>`
  margin: 0;
  font-family: Aileron;
  font-size: ${p => p.fontSize + "px"};
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  position: absolute;
  left: 3.03%;
  bottom: 2%;
  color: rgba(240, 240, 255, 0.8);
  margin: 0;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

const SquaredProgress: React.FC<SquaredProgressProps> = props => {
  const [isSquarredMouseOver, setIsSquarredMouseOver] = React.useState(false)
  const generateSquaredOutline = (howmanygolden: number, misspart: number) => {
    let i: number
    const parts = ["bottom", "right", "top", "left"]
    const result: JSX.Element[] = []
    const acceptedparts: string[] = []
    const flooredhowmnaygoldenbar = Math.floor(howmanygolden)
    for (i = 0; i < flooredhowmnaygoldenbar; i++) {
      acceptedparts.push(parts[i])
      let preparedstyleforborder: any = {}
      if (parts[i] === "bottom") {
        preparedstyleforborder = {
          width: "100.7%",
          borderBottom: "5px solid #E4DC00",
          position: "absolute",
          bottom: "-0.7%"
        }
      } else if (parts[i] === "right") {
        preparedstyleforborder = {
          height: "100%",
          borderRight: "5px solid #E4DC00",
          position: "absolute",
          right: "-0.7%"
        }
      } else if (parts[i] == "top") {
        preparedstyleforborder = {
          width: "101%",
          borderTop: "5px solid #E4DC00",
          position: "absolute",
          top: "-0.8%",
          right: "-0.7%"
        }
      } else if (parts[i] == "left") {
        preparedstyleforborder = {
          height: "100.97%",
          borderLeft: "5px solid #E4DC00",
          position: "absolute",
          left: "-0.7%",
          top: "-0.7%"
        }
      }

      let border = (
        <span id={parts[i]} key={i} style={preparedstyleforborder}></span>
      )
      result.push(border)
    }

    if (misspart > 0) {
      var x = howmanygolden
      var decimals = x - Math.floor(x)
      var decimalPlaces = x.toString().split(".")[1].length
      var tofixed = decimals.toFixed(decimalPlaces)
      var resultnumber = Number(tofixed) * 100 + 5
      let preparedstyleforborder: any = {}
      let fullparts = acceptedparts
      let difference = parts.filter(x => !acceptedparts.includes(x))

      if (fullparts.length >= 1) {
        if (difference[0] == "right") {
          preparedstyleforborder = {
            height: resultnumber + "%",
            borderRight: "5px solid #E4DC00",
            position: "absolute",
            right: "-0.7%",
            bottom: "0"
          }
        } else if (difference[0] == "top") {
          preparedstyleforborder = {
            width: resultnumber + "%",
            borderTop: "5px solid #E4DC00",
            position: "absolute",
            top: "-0.8%",
            right: "-0.7%"
          }
        } else if (difference[0] == "left") {
          preparedstyleforborder = {
            height: resultnumber + "%",
            borderLeft: "5px solid #E4DC00",
            position: "absolute",
            left: "-0.7%",
            top: "-0.7%"
          }
        }
        let border = (
          <span id={parts[i]} key={i} style={preparedstyleforborder}></span>
        )
        result.push(border)
      } else {
        preparedstyleforborder = {
          width: resultnumber + "%",
          borderBottom: "5px solid #E4DC00",
          position: "absolute",
          bottom: "-0.7%"
        }
        let border = (
          <span id={parts[i]} key={i} style={preparedstyleforborder}></span>
        )
        result.push(border)
      }
    }
    return result
  }

  const SquaredProgress: React.FC<SquarredActualProgresProps> = subprops => {
    let howmanygolden = subprops.progressValue / 25
    let whatisleft = subprops.progressValue % 25
    const SquarredProgressContent = generateSquaredOutline(
      howmanygolden,
      whatisleft
    )

    return (
      <>
        {SquarredProgressContent.map((Element: any, index) => {
          return Element
        })}
      </>
    )
  }

  return (
    <>
      <SquaredProgressBarOutline
        gap={props.gaps}
        width={props.width}
        height={props.height}
        id={props.id}
        mouseOver={isSquarredMouseOver}
        onMouseEnter={() => {
          setIsSquarredMouseOver(true)
        }}
        onMouseLeave={() => {
          setIsSquarredMouseOver(false)
        }}
        onClick={e => {
          e.stopPropagation()
          props.OpenEditMilestoneTab(e.currentTarget, true, true)
          props.getMilestoneData([
            {
              id: props.id,
              goal: props.goal,
              duration: props.duration,
              startDate: ConvertDateFormat(props.startDate),
              dueDate: ConvertDateFormat(props.dueDate),
              progress: props.progressValue,
              relativeProgress: PercentageConvertation(props.relativeProgress)
            }
          ])
          props.closeDialog()
        }}
      >
        <SquarredProgressBarNumber
          fontSize={props.width / 6}
          width={props.width / 4}
          height={props.height / 4}
        >
          {props.goalAchievingValue > 100
            ? ">100"
            : Math.ceil(props.goalAchievingValue)}
          %
        </SquarredProgressBarNumber>
        <SquaredProgress
          width={props.width}
          height={props.height}
          progressValue={props.progressValue}
        ></SquaredProgress>
      </SquaredProgressBarOutline>
    </>
  )
}

export default SquaredProgress
