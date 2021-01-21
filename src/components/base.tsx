import Navbar from "./Navbar"
import { getdata } from "../functions/api"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom"
import BodyComponent from "./Body"
import React from "react"
import OverviewProject from "./screens/Overview"
import ProjectDetailPageProps from "./screens/ProjectDetails"
import axios from "../functions/axios"
import DragComponent from "./ui/Draggable"
export interface BaseProps {}

function NavbarComponent() {
  let location = useLocation()
  if (location.pathname.includes("project/detail")) {
    return <Navbar context={"Projects"}></Navbar>
  }

  return <Navbar></Navbar>
}

const BaseApp: React.FC<BaseProps> = () => {
  const [detailPage, setDetailPage] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (window.location.href.includes("detail")) {
      setDetailPage(true)
    } else if (window.location.href.includes("all")) {
      setDetailPage(false)
    }
  }, [window.location.href, detailPage])
  return (
    <Router>
      <Route>
        <NavbarComponent></NavbarComponent>
        <BodyComponent>
          <Switch>
            <Route exact path="/" />
            <Route path="/project/all" component={OverviewProject} />
            <Route
              path="/project/detail/:id"
              component={ProjectDetailPageProps}
            />
            <Route path="/users" />
          </Switch>
        </BodyComponent>
      </Route>
    </Router>
  )
}

export default BaseApp
