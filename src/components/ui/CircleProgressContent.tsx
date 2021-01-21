import { Box, CircularProgress } from "@material-ui/core"
import React, { Component } from "react"
import { TopHeaderLeftBıgProgressIcon } from "./ConstantUi"
import BıgProgressIcon from "../../static/svgicon/bigprogressicon.svg"
import { Convertpercentage } from "../../functions/cleaningData"

export interface CircleProgressContentProps {
  smallSize?: boolean
  progressvalue?: number | any
}

const CircleProgressContent: React.FC<CircleProgressContentProps> = props => {
  return (
    <Box
      position="relative"
      display="inline-flex"
      visibility={
        !props.smallSize && props.progressvalue === 0 ? "hidden" : "visible"
      }
    >
      <CircularProgress
        style={{
          height: props.smallSize ? "48px" : "188px",
          width: props.smallSize ? "48px" : "188px",
          color: "yellow",
          zIndex: 999
        }}
        thickness={5}
        variant="determinate"
        value={
          props.progressvalue >= 1
            ? 100
            : Convertpercentage(props.progressvalue).converted
        }
      />
      <Box
        style={{
          height: props.smallSize ? "48px" : "188px",
          width: props.smallSize ? "48px" : "188px"
        }}
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <TopHeaderLeftBıgProgressIcon
          small={props.smallSize}
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
            backgroundColor: "#32324D",
            borderRadius: "50%",
            display: "inline-flex",
            color: "rgba(240, 240, 255, 1)"
          }}
        >
          {!props.smallSize && (
            <div
              style={{
                display: "flex",
                fontFamily: "aileron",
                fontSize: "72px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "86px",
                letterSpacing: "0em",
                textAlign: "left"
              }}
            >
              {props.progressvalue >= 1
                ? 100
                : Convertpercentage(props.progressvalue).converted}
              <div
                style={{
                  display: "inline-flex",
                  fontFamily: "aileron",
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "43px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  alignItems: "center"
                }}
              >
                %
              </div>
            </div>
          )}
        </div>
      </Box>
    </Box>
  )
}

export default CircleProgressContent
