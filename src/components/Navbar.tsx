import { Button } from "@material-ui/core"

import React from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import FrameIcon from "../static/svgicon/FrameIcon.svg"
import SettingsIcon from "../static/svgicon/SettingIcon.svg"
import CreateProjectRadioInputForms from "./forms/createProjectForm"
const NavbarRoot = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  background: rgb(50, 50, 77, 1);
  box-sizing: border-box;
  min-width: 100%;
  min-height: 60px;
  border-bottom: 5px solid #636380;
  padding: 20px 25px 20px 25px;
`

const NavbarContainer = styled.div`
  display: flex;
  flex: 4;
`
const NavbarLinksContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  flex: 4;
  align-items: center;
  text-align: center;
  flex-direction: row;
`
const NavbarLinksContainerItems = styled.div`
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`
const NavbarUserContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`

const NavbarItem = styled.div`
  display: flex;
  position: relative;
`
const Icon = styled.img`
  width: 45px;
  height: 45px;
`
export const CreateNewProjectButtonContainer = styled.div`
  display: flex;
  max-width: 163px;
  width: 100%;
  cursor: pointer;
  max-height: 43px;
  height: 100%;
  font-weight: 400;
  font-size: 18px;
  border-radius: 5px;
  border: 3px solid #484862;
  text-align: center;
  justify-content: center;
  color: white;
  padding: 6px 2px 5px 2px;
`
const DropDownCreateMenuContainer = styled.div<{ opened: boolean }>`
  min-width: 364px;
  display: flex;
  opacity: ${p => (p.opened ? "1" : "0")};
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  min-height: 389px;
  top: 47px;
  z-index: ${p => (p.opened ? "9999" : "-5555")};
  right: 145px;
  background-color: rgba(50, 50, 77, 0.95);
  width: 100%;
  height: 100%;
  border: 3px solid rgba(240, 240, 255, 0.1);
  border-radius: 5px;
  padding-left: 25px;
  padding-top: 34px;
  padding-bottom: 20px;
  padding-right: 21px;
  box-sizing: border-box;
  flex-direction: column;
`
const DropDownHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20%;
`
const DropDownMenuHeaderText = styled.div`
  font-weight: 400;
  font-size: 12px;
  display: flex;
  line-height: 14.4px;
  color: rgba(228, 220, 0, 1);
  min-width: 99px;
  max-height: 14px;
  min-height: 14px;
  width: 100%;
  height: 100%;
`
const DropDownHintText = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  min-width: 318px;
  font-size: 18px;
  min-height: 22px;
  max-width: 318px;
  max-height: 22px;
  font-weight: 400;
  color: rgba(240, 240, 255, 1);
  line-height: 21.6px;
`
const DropDownMenuBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
export interface NavbarProps {}

type Props = NavbarProps
const Navbar: React.FC<NavbarProps> = props => {
  const history = useHistory()
  const [showCreateMenu, setCreateMenu] = React.useState(false)
  return (
    <NavbarRoot>
      <NavbarContainer>
        <NavbarLinksContainer>
          <NavbarLinksContainerItems>
            <NavbarItem>
              <Icon src={FrameIcon}></Icon>
            </NavbarItem>
          </NavbarLinksContainerItems>
        </NavbarLinksContainer>
        <NavbarUserContainer>
          <NavbarUserContainer>
            <CreateNewProjectButtonContainer
              onClick={() => {
                setCreateMenu(!showCreateMenu)
              }}
            >
              Create Project
            </CreateNewProjectButtonContainer>
            <CreateNewProjectButtonContainer
              onClick={() => {
                history.push("/project/all")
              }}
            >
              Projects
            </CreateNewProjectButtonContainer>

            <DropDownCreateMenuContainer opened={showCreateMenu}>
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
            <Icon src={SettingsIcon}></Icon>
          </NavbarUserContainer>
        </NavbarUserContainer>
      </NavbarContainer>
    </NavbarRoot>
  )
}

export default Navbar
