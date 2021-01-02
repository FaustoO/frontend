import React from "react"
import axios from "../../functions/axios"
import styled from "styled-components"
import { RouteComponentProps, useHistory } from "react-router"
import UserLogo from "../../static/svgicon/userDefault.svg"
import IfLogo from "../../static/svgicon/iflogo.svg"
import BıgProgressIcon from "../../static/svgicon/bigprogressicon.svg"
import StatusBarIcon from "../../static/svgicon/statusbar.svg"
import { makeStyles, TextField, IconButton } from "@material-ui/core"
import EditForm from "../forms/editprojectnameform"
import DatePickerForm from "../forms/datepickerForm"
import DescriptionBoxTextArea from "../forms/descriptionProjectForm"
import PenIcon from "../../static/svgicon/pencil.svg"

export interface ProjectDetailPageProps {
  id: any
}
const ProjectDetailsContainer = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: 0.3fr 0.2fr 2.5fr 1fr;
  grid-template-rows: 0.8fr 1.2fr 1fr;
  gap: 4px 5px;
  grid-template-areas:
    "LeftAside TopHeader TopHeader TopHeader"
    "LeftAside controlpanel Detail-Content Detail-Content"
    "LeftAside controlpanel Detail-Content Detail-Content";
`
const LeftAside = styled.div`
  grid-area: LeftAside;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  object-fit: cover;
  background: rgba(50, 50, 77, 1);
`
const LeftAsideContentBox = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  flex-direction: column;
  justify-content: space-around;
`
const LeftAsideUserContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 35%;
`
const LeftAsideContent2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`
const LeaftAsideContent2Image = styled.img``
const LeftAsideContent2TextBox = styled.div`
  display: flex;
  position: relative;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  color: rgba(228, 220, 0, 1);
  text-align: left;
`

const UserLogoImage = styled.img``
const UserNameContainer = styled.div`
  display: flex;
  max-width: 116px;
  align-self: center;
  color: rgba(240, 240, 255, 1);
  width: 100%;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  justify-content: center;
  margin-top: 12px;
`
const TopHeader = styled.div`
  grid-area: TopHeader;
  border-radius: 5px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 27px 90px 44px 51px;
  background: rgba(50, 50, 77, 1);
`
const TopHeaderLeft = styled.div`
  display: flex;
`
const TopHeaderLeftBıgProgressIcon = styled.img``
const TopHeaderRight = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;
  max-height: 188px;
`
const TopHeaderTitleBox = styled.div`
  display: flex;
  height: 20%;
  flex-direction: column;
  max-width: 449px;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
`
const ProjectGoalText = styled.div`
  color: rgba(240, 240, 255, 0.7);
`
const ProjectNameInputContainer = styled.div`
  display: flex;
  color: rgba(240, 240, 255, 0.7);
  justify-content: space-between;
`
const EditPencilIcon = styled.img`
  height: 50%;
  z-index: 9999;
  cursor: pointer;
`
const TopHeaderStatusBarContainer = styled.div`
  display: flex;
  height: 20%;
  width: 100%;
`
const TopHeaderStatusBar = styled.img``
const ControlPanel = styled.div`
  grid-area: controlpanel;
  border-radius: 5px;

  background: rgba(50, 50, 77, 1);
`
const DetailContent = styled.div`
  grid-area: Detail-Content;
  border-radius: 5px;
  padding: 45px 95px 55px 35px;
  background: rgba(50, 50, 77, 1);
`
const DetailContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  flex-direction: column;
`
const DescriptionBoxContainer = styled.div`
  display: flex;
  height: 65% !important;
  border: 3px solid rgba(240, 240, 255, 0.1);
  height: auto;
  border-radius: 5px;
`

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
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getdata()
  }, [props.match.params])

  const projectnameinputref = React.useRef<React.MutableRefObject<any> | any>()

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
                color: "rgba(228, 220, 0, 1)"
              }}
            >
              Description{" "}
              <IconButton type="submit" form="descriptionboxform">
                <img
                  style={{ height: "15px", width: "15px" }}
                  src={PenIcon}
                ></img>
              </IconButton>
            </span>
            <DescriptionBoxContainer>
              <DescriptionBoxTextArea
                id={elm.id}
                user={elm.user}
                typeofproject={elm.typeofproject}
                defaultValue={elm.description}
              ></DescriptionBoxTextArea>
            </DescriptionBoxContainer>
          </DetailContentContainer>
        </DetailContent>
      </ProjectDetailsContainer>
    ))
  }

  return data ? <LoadedData></LoadedData> : <h2>404 Detailed Not Found</h2>
}

export default ProjectDetailPage
