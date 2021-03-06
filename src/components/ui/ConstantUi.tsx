import React, { SVGProps } from "react"
import styled, { keyframes, css } from "styled-components"
import SVG from "react-inlinesvg"

//ICONS
export const UserLogoImage = styled.img``

export const SearchButtonIcon = styled.img`
  width: 42px;
  cursor: pointer;
  height: 32px;
`
export const LeaftAsideContent2Image = styled.img``

export const MilestonesTabIcon = styled.img`
  width: 33px;
  height: 33px;
  cursor: pointer;
  color: green;
  ::&svg {
    fill: green;
  }
`

export const TopHeaderLeftBıgProgressIcon = styled.img<{
  small?: boolean
  medium?: boolean
}>`
  ${p =>
    p.small
      ? p.medium
        ? "height:70px;width:70px;"
        : "height:48px;width:48px;"
      : "height:auto;width:auto;"}
`

export const MilestoneCloseEditTabIcon = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 40px;
  max-width: 26px;
  left: 0;
  top: 60px;
  cursor: pointer;
`

export const MilestoneAddButtonIcon = styled.img`
  height: 31px;
  cursor: pointer;
  width: 31px;
`

export const MilestoneTabIcon = styled(SVG)<SVGProps<any>>`
  width: 33px;
  height: 33px;
  cursor: pointer;
  & path {
    fill: ${({ color }) => color};
  }
`
export const ClockIconImage = styled.img`
  height: 42px;
  width: 42px;
`

export const MilestoneSearchTabIcon = styled(SVG)<SVGProps<any>>`
  width: 42px;
  height: 32px;
  cursor: pointer;
  & path {
    fill: ${({ color }) => color};
  }
`
export const MilestoneTreeViewIcon = styled(SVG)<SVGProps<any>>`
  cursor: pointer;
  max-width: 121px;
  position: absolute;
  right: 0;
  top: 65%;
  max-height: 186px;
  & path {
    fill: ${({ color }) => color};
  }
`
export const ProgressBarImage = styled.img`
  width: 70px;
  height: 70px;
`

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`
export const FrameIconElement = styled.img<{ Spin?: boolean }>`
  width: 45px;
  height: 45px;
  animation: ${props =>
    props.Spin
      ? css`
          ${rotate} 2s linear infinite
        `
      : ""};
`
export const SettingsIconElement = styled.img`
  width: 45px;
  height: 45px;
`
export const SaveIcon = styled.img`
  cursor: pointer;
`
export const DiscardIcon = styled.img`
  cursor: pointer;
`

// Body
export const BodyContainer = styled.div`
  display: flex;
  position: relative;
  height: 90vh;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px;
    margin-right: 8px;
    margin-left: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(240, 240, 255, 1);

    width: 100%;
    height: 100%;
    max-width: 7px;
    max-height: 11px;
    border-radius: 5px;
  }
`
//Navbar

export const NavbarRoot = styled.div`
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

export const NavbarContainer = styled.div`
  display: flex;
  flex: 4;
`
export const NavbarLinksContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  flex: 4;
  align-items: center;
  text-align: center;
  flex-direction: row;
`
export const NavbarLinksContainerItems = styled.div`
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`
export const NavbarUserContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`

export const NavbarItem = styled.div`
  display: flex;
  position: relative;
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
export const DropDownCreateMenuContainer = styled.div<{ opened: boolean }>`
  min-width: 364px;
  display: flex;
  opacity: ${p => (p.opened ? "1" : "0")};
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1),
    z-index 250ms cubic-bezier(0.4, 0, 0.2, 1);
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
export const DropDownHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20%;
`
export const DropDownMenuHeaderText = styled.div`
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
export const DropDownHintText = styled.div`
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
export const DropDownMenuBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
// Project Details
export const ProjectDetailsContainer = styled.div<{ ismilestoneedit: boolean }>`
  display: inline-grid;
  width: 100%;
  grid-template-columns: ${p =>
    p.ismilestoneedit ? "0.3fr 0.2fr 2.5fr 2.5fr" : "0.3fr 0.2fr 2.5fr 1fr"};
  grid-template-rows: 0.8fr 1.2fr 1fr;
  gap: 4px 5px;
  grid-template-areas: ${p =>
    p.ismilestoneedit
      ? `${'"LeftAside TopHeader TopHeader TopHeader"\n"LeftAside controlpanel Detail-Content  Detail-Content-2"\n"LeftAside controlpanel Detail-Content Detail-Content-2"'}`
      : `${'"LeftAside TopHeader TopHeader TopHeader"\n"LeftAside controlpanel Detail-Content Detail-Content"\n"LeftAside controlpanel Detail-Content Detail-Content"'}`};
`
export const Detail2 = styled.div`
  grid-area: Detail-Content-2;
  border-radius: 5px;
  position: relative;
  padding: 45px 95px 55px 35px;
  background: rgba(50, 50, 77, 1);
`
export const Detail2ContentContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`
export const LeftAside = styled.div`
  grid-area: LeftAside;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  object-fit: cover;
  background: rgba(50, 50, 77, 1);
`
export const LeftAsideContentBox = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  flex-direction: column;
  justify-content: space-around;
`
export const LeftAsideUserContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 35%;
`
export const LeftAsideContent2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`
export const LeftAsideContent2TextBox = styled.div`
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

export const UserNameContainer = styled.div`
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
export const TopHeader = styled.div`
  grid-area: TopHeader;
  border-radius: 5px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 27px 90px 44px 51px;
  background: rgba(50, 50, 77, 1);
`
export const TopHeaderLeft = styled.div`
  display: flex;
`
export const TopHeaderRight = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;
  max-height: 188px;
`
export const TopHeaderTitleBox = styled.div`
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
export const ProjectGoalText = styled.div`
  color: rgba(240, 240, 255, 0.7);
`
export const ProjectNameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(240, 240, 255, 0.7);
  justify-content: space-between;
`
export const EditPencilIcon = styled.img`
  height: 50%;
  z-index: 9999;
  cursor: pointer;
`
export const TopHeaderStatusBarContainer = styled.div<{ small?: boolean }>`
  display: flex;
  height: 35%;
  flex-direction: column;
  width: 100%;
`
export const TopHeaderStatusBar = styled.img<{ small?: boolean }>`
  ${p =>
    p.small ? "height:2.76px;width:106.94px;" : "height:auto;width:auto;"}
`
export const ControlPanel = styled.div`
  grid-area: controlpanel;
  border-radius: 5px;
  padding: 48px 18px;
  background: rgba(50, 50, 77, 1);
`
export const ControlPanelItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 96px;
  justify-content: space-between;
`

export const DetailContent = styled.div`
  grid-area: Detail-Content;
  border-radius: 5px;
  padding: 45px 95px 55px 35px;
  background: rgba(50, 50, 77, 1);
`
export const DetailContentContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
  flex-direction: column;
`
export const DescriptionBoxContainer = styled.div`
  display: flex;
  height: 65% !important;
  border: 3px solid rgba(240, 240, 255, 0.1);
  height: auto;
  border-radius: 5px;
`
export const SaveDiscardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`
export const DetailMilestonesRoot = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-height: 728px;
  flex-direction: row;
  justify-content: space-between;
`
export const DetailMilestoneContainer = styled.div<{ width: number }>`
  display: flex;
  width: ${p => p.width}%;
  height: 100%;
  flex-direction: column;
`

export const MilestonesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-family: Aileron;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
`
export const MilestoneHeaderText = styled.div`
  display: flex;
  color: rgba(228, 220, 0, 1);
`
export const MilestoneHeaderHintText = styled.div`
  display: flex;
  color: rgba(240, 240, 255, 0.7);
`
export const MilestoneAddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  justify-content: flex-end;
`
export const MilestonesBodyRoot = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
    margin-right: 8px;
    margin-left: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(240, 240, 255, 1);

    width: 100%;
    height: 100%;
    max-width: 7px;
    max-height: 11px;
    border-radius: 5px;
  }
`
export const MilestonesWrapper = styled.div<{ mouseOver?: boolean }>`
  display: flex;
  padding: 12px 0px 12px 0px;
  height: 10%;
  max-height: 10%;
  border-radius: 5px;
  border: ${p =>
    p.mouseOver
      ? "3px solid rgba(228, 220, 0, 1)"
      : "3px solid rgba(240, 240, 255, 0.1)"};

  max-width: 100%;
  flex-basis: 100%;
  justify-content: space-between;
  background-color: #373752;
  flex-direction: row;
  flex-grow: 0;
  margin-bottom: 11px;
`
export const MilestoneLeftSide = styled.div`
  display: flex;
  flex-grow: 0;

  flex-basis: 30%;
  max-width: 30%;
  min-width: 397.5px;

  flex-direction: row;
  justify-content: space-evenly;
`
export const ClockIconContainer = styled.div`
  display: flex;
`

export const MilestoneGoalStaticsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const MilestoneGoalStatic = styled.div`
  display: flex;
  font-family: Aileron;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(228, 220, 0, 1);
`
export const MilestoneGoalContent = styled.div`
  display: flex;
  font-family: Aileron;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(240, 240, 255, 0.7);
`
export const MilestonesDateContentRoot = styled.div<{
  isEditTapOpened: boolean
}>`
  display: flex;
  flex-grow: 0;
  flex-basis: 30%;
  max-width: 30%;
  max-height: 50px;
  justify-content: space-evenly;
  flex-direction: row;
  border-right: ${p =>
    p.isEditTapOpened ? "" : "4px solid rgba(240, 240, 255, 0.5);"}
  border-radius: 1px;
`
export const MilestoneDateContentContanier = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 44px;
  flex-direction: column;
`
export const MilestoneDateContentLabel = styled.div`
  display: flex;
  font-family: Aileron;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(228, 220, 0, 1);
`
export const MilestoneDateDataContent = styled.div`
  display: flex;
  color: rgba(240, 240, 255, 1);
  font-family: Aileron;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
export const MilestoneStatusBarsContentContainer = styled.div`
  display: flex;

  flex-grow: 0;
  flex-basis: 35%;
  max-width: 35%;
  max-height: 50px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`
export const MilestoneStatusBarContentItems = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 10%;
  max-width: 10%;
`
export const MilestoneEndThreeDotContainer = styled.div`
  display: flex;
  flex-grow: 0;
  flex-basis: 3%;
  border-left: 4px solid rgba(240, 240, 255, 0.5);
  border-radius: 1px;
  max-width: 3%;
  justify-content: center;
`
export const MilestoneEndThreeDotImage = styled.img`
  height:30px
  width:8px;
`

//

// Overview
export const ProjectOverviewWrapper = styled.div<{ mouseOver?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
  max-height: 492px;
  min-width: 947px;
  margin-bottom: 5px;
  cursor: pointer;
  margin-right: 5px;
  overflow-y: hidden;
  max-width: 947px;
  border: ${p => (p.mouseOver ? "3px solid rgba(228, 220, 0, 1)" : "0px")};

  border-radius: 5px;

  background: rgba(50, 50, 77, 1);
  &::-webkit-scrollbar {
    width: 7px;
    margin-right: 8px;
    margin-left: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(240, 240, 255, 1);

    width: 100%;
    height: 100%;
    max-width: 7px;
    max-height: 11px;
    border-radius: 5px;
  }
`
export const ProjectOverviewContentBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 27px 41px 69px 48px;
  flex-direction: column;
  justify-content: space-between;
`
export const ProjectOverviewHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 440px;
  justify-content: space-between;
  flex: 1;
`
export const ProjectContentBox = styled.div`
  display: flex;
  flex: 4;
  flex-direction: row;
`
export const ProgressBarContainer = styled.div`
  display: flex;
`
export const MainProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: rgba(99, 99, 128, 0.1);
  border: 3px solid rgba(240, 240, 255, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  min-width: 200px;
  max-height: 52px;
  max-width: 858px;
  justify-content: flex-start;
  align-items: center;
`

export const SubSubProjectBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`
export const SubProjectGroup = styled.div`
  display: flex;
  width: 60px;
  justify-content: space-between;
  min-width: 30px;
`
export const SubSubProjectItem = styled.img`
  width: 28px;
  height: 28px;
`
export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const GoalText = styled.div`
  display: flex;
  color: rgba(228, 220, 0, 1);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`
export const ProjectNameContainer = styled.div`
  display: flex;
  color: rgba(240, 240, 255, 1);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
