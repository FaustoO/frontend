import { Dialog, makeStyles } from "@material-ui/core"

import FrameIcon from "../../static/svgicon/FrameIcon.svg"

import { FrameIconElement } from "../ui/ConstantUi"
export interface LoadingProps {
  loading: boolean
}

const Loading: React.FC<LoadingProps> = props => {
  const useStyles = makeStyles(() => ({
    paper: {
      background: "transparent",
      overflowX: "hidden",
      overflowY: "hidden",
      margin: "0",
      padding: "0",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      boxShadow: "none"
    }
  }))
  const classes = useStyles()
  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      classes={{ paper: classes.paper }}
      open={props.loading}
    >
      <FrameIconElement Spin={props.loading} src={FrameIcon}></FrameIconElement>
    </Dialog>
  )
}

export default Loading
