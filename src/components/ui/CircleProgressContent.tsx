import { Box, CircularProgress } from "@material-ui/core"
import React, { Component } from "react"
import { TopHeaderLeftBıgProgressIcon } from "./ConstantUi"
import BıgProgressIcon from "../../static/svgicon/bigprogressicon.svg"
import {
  Convertpercentage,
  PercentageConvertation
} from "../../functions/cleaningData"
import { REFUSED } from "dns"

export interface CircleProgressContentProps {
  smallSize?: boolean
  progressvalue?: number | any
  mediumSize?: boolean
  treeView?: boolean
  mainone?: boolean
  edittab?: boolean
}

const CircleProgressContent: React.FC<CircleProgressContentProps> = props => {
  // React.useEffect(() => {
  //   console.log(
  //     "checkhtah",
  //     props.progressvalue,
  //     PercentageConvertation(props.progressvalue)
  //   )
  // }, [])
  let checkitout: any = props.mainone || props.treeView
  return (
    <Box position="relative" display="inline-flex" visibility={"visible"}>
      <CircularProgress
        style={{
          height: props.smallSize
            ? props.mediumSize
              ? "70px"
              : "48px"
            : "188px",
          width: props.smallSize
            ? props.mediumSize
              ? "70px"
              : "48px"
            : "188px",
          color: "yellow",
          zIndex: 999
        }}
        thickness={5}
        variant="determinate"
        value={
          props.progressvalue >= 1
            ? 100
            : PercentageConvertation(props.progressvalue)
        }
      />
      <Box
        style={{
          height: props.smallSize
            ? props.mediumSize
              ? "70px"
              : "48px"
            : "188px",
          width: props.smallSize
            ? props.mediumSize
              ? "70px"
              : "48px"
            : "188px"
        }}
        top={0}
        left={props.smallSize ? -1.5 : 0}
        bottom={props.smallSize ? -3 : 0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <TopHeaderLeftBıgProgressIcon
          small={props.smallSize}
          medium={props.mediumSize}
          src={BıgProgressIcon}
        ></TopHeaderLeftBıgProgressIcon>
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            height: "80%",
            width: "80%",
            minHeight: "80%",
            minWidth: "80%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              props.smallSize || props.mediumSize ? "#373752" : "#32324D",
            borderRadius: props.smallSize || props.mediumSize ? "80%" : "50%",
            display: "inline-flex",
            color: "rgba(240, 240, 255, 1)"
          }}
        >
          {checkitout && (
            <div
              style={{
                display: "flex",
                fontFamily: "aileron",
                fontSize: props.treeView ? "25px" : "50px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "86px",
                letterSpacing: "0em",
                textAlign: "left"
              }}
            >
              {props.progressvalue > 1
                ? ">100"
                : PercentageConvertation(props.progressvalue) == 0
                ? " "
                : Math.ceil(PercentageConvertation(props.progressvalue))}
              <div
                style={{
                  display: "inline-flex",
                  fontFamily: "aileron",
                  fontSize: props.treeView ? "10px" : "36px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "43px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  alignItems: "center"
                }}
              >
                {PercentageConvertation(props.progressvalue) == 0 ? " " : "%"}
              </div>
            </div>
          )}
        </div>
      </Box>
    </Box>
  )
}

export default CircleProgressContent
