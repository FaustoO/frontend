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
  firstTimeChange: boolean
  callbackFunction: any
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
  font-family: aileron;

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
  const [withoutSave, setWithoutSave] = React.useState<boolean>(true)
  const [processName, setProcessName] = React.useState<string>("")
  const [defaultValue, setDefaultValue] = React.useState<any>([""])
  const InputBoxRef = React.useRef<React.MutableRefObject<any> | any>()
  React.useEffect(() => {
    if (processName === "Discard" && withoutSave && props.firstTimeChange) {
      setActiveDescriptionText(defaultValue[0])
      InputBoxRef.current.value = defaultValue[0]
    } else if (processName === "Discard" && withoutSave) {
      InputBoxRef.current.value = props.defaultValue
      setActiveDescriptionText(props.defaultValue)
    } else if (processName === "Discard") {
      if (defaultValue.length == 2) {
        setActiveDescriptionText(props.defaultValue)
        InputBoxRef.current.value = props.defaultValue
      } else if (defaultValue.length > 2) {
        setActiveDescriptionText(defaultValue[defaultValue.length - 2])
        InputBoxRef.current.value = defaultValue[defaultValue.length - 2]
      } else {
        setActiveDescriptionText(defaultValue[0])
        InputBoxRef.current.value = defaultValue[0]
      }
    }
  }, [processName])
  React.useEffect(() => {
    if (props.firstTimeChange) {
      //pass
      InputBoxRef.current.value = defaultValue[0]
    } else {
      InputBoxRef.current.value = props.defaultValue
    }
  }, [])
  const handleDescriptionBoxSubmit = async (e: any) => {
    e.preventDefault()

    if (activeDescriptionText === "") {
    } else {
      if (processName === "Save") {
        await axios
          .put(`project/detail/${props.id}`, {
            user: props.user,
            typeofproject: props.typeofproject,
            description: activeDescriptionText
          })
          .then(res => {
            setWithoutSave(false)
            setDefaultValue([...defaultValue, res.data.description])
            props.callbackFunction()
            InputBoxRef.current.value = res.data.description
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
            style={{ fontFamily: "aileron" }}
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
          onClick={() => {
            setProcessName("Save")
          }}
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
