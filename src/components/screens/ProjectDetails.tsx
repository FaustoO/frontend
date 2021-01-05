import React from "react"
import axios from "../../functions/axios"
import { RouteComponentProps } from "react-router"
import UserLogo from "../../static/svgicon/userDefault.svg"
import IfLogo from "../../static/svgicon/iflogo.svg"
import BıgProgressIcon from "../../static/svgicon/bigprogressicon.svg"
import StatusBarIcon from "../../static/svgicon/statusbar.svg"
import EditForm from "../forms/editprojectnameform"
import DatePickerForm from "../forms/datepickerForm"
import DescriptionBoxTextArea from "../forms/descriptionProjectForm"
import {
  ControlPanel,
  DetailContent,
  DetailContentContainer,
  LeaftAsideContent2Image,
  LeftAside,
  LeftAsideContent2,
  LeftAsideContent2TextBox,
  LeftAsideContentBox,
  LeftAsideUserContent,
  ProjectDetailsContainer,
  ProjectNameInputContainer,
  TopHeader,
  TopHeaderLeft,
  TopHeaderLeftBıgProgressIcon,
  TopHeaderRight,
  TopHeaderStatusBar,
  TopHeaderStatusBarContainer,
  TopHeaderTitleBox,
  UserLogoImage,
  UserNameContainer
} from "../ui/ConstantUi"

export interface ProjectDetailPageProps {
  id: any
}

type Props = RouteComponentProps & ProjectDetailPageProps
const ProjectDetailPage: React.FC<Props> = props => {
  const [data, setData] = React.useState<any[] | null>()
  const getdata = async () => {
    const state = props.match.params
    const id = (state as any)?.id
    await axios
      .get(`project/detail/${id}`)
      .then(res => {
        setData([res.data])
      })
      .catch(err => prompt(err))
  }

  React.useEffect(() => {
    getdata()
  }, [props.match.params])

  const LoadedData: any = () => {
    return data?.map(elm => (
      <ProjectDetailsContainer>
        <LeftAside>
          <LeftAsideContentBox>
            {" "}
            <LeftAsideUserContent>
              {" "}
              <UserLogoImage src={UserLogo}></UserLogoImage>
              <UserNameContainer>{elm.user}</UserNameContainer>
            </LeftAsideUserContent>
            <LeftAsideContent2>
              <LeaftAsideContent2Image src={IfLogo}></LeaftAsideContent2Image>
              <LeftAsideContent2TextBox>Project</LeftAsideContent2TextBox>
            </LeftAsideContent2>
          </LeftAsideContentBox>
        </LeftAside>
        <TopHeader>
          <TopHeaderLeft>
            <TopHeaderLeftBıgProgressIcon
              src={BıgProgressIcon}
            ></TopHeaderLeftBıgProgressIcon>
          </TopHeaderLeft>
          <TopHeaderRight>
            <TopHeaderTitleBox>
              <ProjectNameInputContainer style={{ marginTop: "5px" }}>
                <EditForm
                  isnamechanged={elm.isnamechanged}
                  user={elm.user}
                  defaultValue={elm.isnamechanged === true ? elm.goal : ""}
                  typeofproject={elm.typeofproject}
                  id={elm.id}
                ></EditForm>
              </ProjectNameInputContainer>
            </TopHeaderTitleBox>
            <TopHeaderStatusBarContainer>
              <TopHeaderStatusBar src={StatusBarIcon}></TopHeaderStatusBar>
            </TopHeaderStatusBarContainer>
          </TopHeaderRight>
        </TopHeader>
        <ControlPanel></ControlPanel>
        <DetailContent>
          <DetailContentContainer>
            {" "}
            <DatePickerForm
              user={elm.user}
              typeofproject={elm.typeofproject}
              defaultStartData={elm.startDate}
              defaultPlannedEndData={elm.plannedEndDate}
              id={elm.id}
            ></DatePickerForm>
            <span
              style={{
                fontFamily: "Roboto",
                fontSize: "12px",
                fontStyle: "normal",
                letterSpacing: "0em",
                color: "rgba(228, 220, 0, 1)",
                marginBottom: "2px"
              }}
            >
              Description{" "}
            </span>
            <DescriptionBoxTextArea
              id={elm.id}
              typeofproject={elm.typeofproject}
              user={elm.user}
              defaultValue={elm.description}
            ></DescriptionBoxTextArea>
          </DetailContentContainer>
        </DetailContent>
      </ProjectDetailsContainer>
    ))
  }

  return data ? <LoadedData></LoadedData> : <h2>404 Detailed Not Found</h2>
}

export default ProjectDetailPage
