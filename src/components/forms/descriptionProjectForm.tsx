import styled from "styled-components"
import React from "react"
import axios from "../../functions/axios"
import { IconButton } from "@material-ui/core"
import {
  DescriptionBoxContainer,
  SaveIcon,
  SaveDiscardContainer,
  DiscardIcon
} from "../ui/ConstantUi"
import DiscardSvgIcon from "../../static/svgicon/discard.svg"
import AcceptIcon from "../../static/svgicon/accept.svg"
import { stringify } from "querystring"

export interface DescriptionBoxTextAreaProps {
  id: string
  user: string
  typeofproject: string
  defaultValue: null | string
}

const DescriptionInput = styled.textarea`
  flex: 1;
  display: block;
  border: none;
  min-width: 0;
  border: none;
  overflow: auto;
  outline: none;
  color: rgba(240, 240, 255, 0.7);
  font-size: 15px;
  padding: 5px;
  font-weight: 400;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  overflow-y: auto;

  background-color: transparent;

  &::-webkit-scrollbar {
    width: 7px;
    margin-right: 8px;
    border-radius: 10px;
    margin-left: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(240, 240, 255, 1);
  }
`

const DescriptionBoxTextArea: React.FC<DescriptionBoxTextAreaProps> = props => {
  const [activeDescriptionText, setActiveDescriptionText] = React.useState<
    string | any
  >("")
  const [processName, setProcessName] = React.useState<string>("")
  const [defaultValue, setDefaultValue] = React.useState<string | null>(
    props.defaultValue
  )
  const InputBoxRef = React.useRef<React.MutableRefObject<any> | any>()
  React.useEffect(() => {
    if (processName === "Discard") {
      console.log("that run")
      InputBoxRef.current.value = defaultValue
    }
  }, [processName])
  React.useEffect(() => {
    InputBoxRef.current.value = defaultValue
  }, [])
  const handleDescriptionBoxSubmit = async (e: any) => {
    e.preventDefault()
    console.log("ya bırak ya")

    if (activeDescriptionText === "") {
    } else {
      if (processName === "Save") {
        console.log("saved")
        await axios
          .put(`project/detail/${props.id}`, {
            user: props.user,
            typeofproject: props.typeofproject,
            description: activeDescriptionText
          })
          .then(res => {
            InputBoxRef.current.value = activeDescriptionText
          })
          .catch(err => prompt(err.response))
      }
    }
  }

  return (
    <>
      <DescriptionBoxContainer>
        <form
          onSubmit={handleDescriptionBoxSubmit}
          id="descriptionboxform"
          style={{ display: "flex", width: "100%" }}
        >
          <DescriptionInput
            ref={InputBoxRef}
            onChange={(e: any) => {
              setActiveDescriptionText(e.target.value)
            }}
          ></DescriptionInput>
        </form>
      </DescriptionBoxContainer>
      <SaveDiscardContainer>
        <IconButton
          disabled={!activeDescriptionText}
          onClick={() => setProcessName("Save")}
          id="savebutton"
          type="submit"
          form="descriptionboxform"
        >
          <SaveIcon src={AcceptIcon}></SaveIcon>
        </IconButton>
        <IconButton
          disabled={!activeDescriptionText}
          onBlur={() => {
            setProcessName("")
          }}
          onClick={() => {
            setProcessName("Discard")
          }}
          id="discardbutton"
        >
          <DiscardIcon src={DiscardSvgIcon}></DiscardIcon>
        </IconButton>
      </SaveDiscardContainer>
    </>
  )
}

export default DescriptionBoxTextArea
