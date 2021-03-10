import React from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography
} from "@material-ui/core"
import createTypography from "@material-ui/core/styles/createTypography"
import CircleProgressContent from "./CircleProgressContent"
import SquaredProgress from "./SquaredProgress"
import { ProjectGoalText } from "./ConstantUi"
import { ProjectGoalLabel } from "../forms/editprojectnameform"
import TreeViewMainContentComponent from "./TreeViewsMainContent"
import { MilestonesType } from "../redux/project/projectType"
interface TreeViewComponentProps {
  open: boolean
  milestones: MilestonesType[]
  projectname: string | null
  projectgoalachieveng: number
  close: () => void
  getMilestoneData: ([]) => void
  OpenEditMilestoneTab: (
    target: any,
    isTreeview?: boolean,
    insideTreeView?: boolean
  ) => void
}

const TreeViewComponent: React.FC<TreeViewComponentProps> = props => {
  const useStyles = makeStyles(() => ({
    paper: {
      background: "rgba(50, 50, 77, 0.95)",
      overflowX: "hidden",
      margin: "0",
      padding: "0"
    }
  }))

  const classes = useStyles()
  const TreeViewComponentContent = React.useCallback(() => {
    return (
      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth={false}
        open={props.open}
        fullWidth={true}
        onClose={() => {
          props.close()
        }}
      >
        <div
          style={{
            height: "100vh",
            padding: "50px 69px 0px 69px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxHeight: "65%",
              position: "relative"
            }}
          >
            <div
              style={{
                flexDirection: "row",
                width: "100%",
                display: "flex",
                paddingBottom: "2%"
              }}
            >
              <CircleProgressContent
                smallSize
                treeView
                mediumSize
                progressvalue={props.projectgoalachieveng}
              ></CircleProgressContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "42px",
                  justifyContent: "center"
                }}
              >
                <ProjectGoalLabel style={{ top: "0px" }}>
                  Project Goal
                </ProjectGoalLabel>
                <ProjectGoalText>{props.projectname}</ProjectGoalText>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                top: props.milestones.length < 3 ? "10%" : "40%"
              }}
            >
              <TreeViewMainContentComponent
                getMilestoneData={props.getMilestoneData}
                OpenEditMilestoneTab={props.OpenEditMilestoneTab}
                milestones={props.milestones}
                closeDialog={props.close}
              ></TreeViewMainContentComponent>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }, [props.open])

  return (
    <>
      <TreeViewComponentContent></TreeViewComponentContent>
    </>
  )
}
export default TreeViewComponent
