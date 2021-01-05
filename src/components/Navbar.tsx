import React from "react"
import { useHistory } from "react-router-dom"
import FrameIcon from "../static/svgicon/FrameIcon.svg"
import SettingsIcon from "../static/svgicon/SettingIcon.svg"
import CreateProjectRadioInputForms from "./forms/createProjectForm"
import {
  NavbarContainer,
  NavbarItem,
  NavbarLinksContainer,
  NavbarLinksContainerItems,
  NavbarRoot,
  NavbarUserContainer,
  CreateNewProjectButtonContainer,
  DropDownCreateMenuContainer,
  DropDownMenuHeaderText,
  DropDownHeaderContainer,
  DropDownHintText,
  DropDownMenuBody,
  FrameIconElement,
  SettingsIconElement
} from "./ui/ConstantUi"

export interface NavbarProps {
  context?: string
}
const Navbar: React.FC<NavbarProps> = props => {
  const history = useHistory()
  const DropDawnMenuContainerRef = React.useRef<any>(null)
  const CreateNewProjectButtonRef = React.useRef<any>(null)

  const handleClickOutside = (e: any) => {
    if (
      !DropDawnMenuContainerRef.current?.contains(e.target) &&
      !CreateNewProjectButtonRef.current?.contains(e.target)
    ) {
      setCreateMenu(false)
    }
  }
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  })
  const [showCreateMenu, setCreateMenu] = React.useState(false)
  return (
    <NavbarRoot>
      <NavbarContainer>
        <NavbarLinksContainer>
          <NavbarLinksContainerItems>
            <NavbarItem>
              <FrameIconElement src={FrameIcon}></FrameIconElement>
            </NavbarItem>
          </NavbarLinksContainerItems>
        </NavbarLinksContainer>
        <NavbarUserContainer>
          <NavbarUserContainer>
            {props.context ? (
              <CreateNewProjectButtonContainer
                ref={CreateNewProjectButtonRef}
                onClick={() => {
                  history.push("/project/all")
                }}
              >
                Projects
              </CreateNewProjectButtonContainer>
            ) : (
              <CreateNewProjectButtonContainer
                ref={CreateNewProjectButtonRef}
                onClick={() => {
                  setCreateMenu(!showCreateMenu)
                }}
              >
                Create Project
              </CreateNewProjectButtonContainer>
            )}

            <DropDownCreateMenuContainer
              ref={DropDawnMenuContainerRef}
              opened={showCreateMenu}
            >
              <DropDownHeaderContainer>
                <DropDownMenuHeaderText>
                  Create New Project
                </DropDownMenuHeaderText>
                <DropDownHintText>
                  Select one of three possible project types
                </DropDownHintText>
              </DropDownHeaderContainer>
              <DropDownMenuBody>
                <CreateProjectRadioInputForms></CreateProjectRadioInputForms>
              </DropDownMenuBody>
            </DropDownCreateMenuContainer>
            <SettingsIconElement src={SettingsIcon}></SettingsIconElement>
          </NavbarUserContainer>
        </NavbarUserContainer>
      </NavbarContainer>
    </NavbarRoot>
  )
}

export default Navbar
