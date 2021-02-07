import styled from "styled-components"
import React from "react"
import axios from "../../functions/axios"
import { IconButton, FormHelperText, TextField } from "@material-ui/core"
import {
  DescriptionBoxContainer,
  SaveIcon,
  SaveDiscardContainer,
  DiscardIcon
} from "../ui/ConstantUi"
import DiscardSvgIcon from "../../static/svgicon/discard.svg"
import AcceptIcon from "../../static/svgicon/accept.svg"
import { stringify } from "querystring"
import { kStringMaxLength } from "buffer"

export interface DescriptionBoxTextAreaProps {
  id?: string
  user?: string
  typeofproject?: string
  defaultValue?: string
  firstTimeChange?: boolean
  callbackFunction?: any
  typemilestone?: boolean
  milestoneid?: string
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
  >(props.defaultValue)
  const [withoutSave, setWithoutSave] = React.useState<boolean>(true)
  const [processName, setProcessName] = React.useState<string>("")
  const [defaultValue, setDefaultValue] = React.useState<string | any>(
    props.defaultValue
  )
  const [SaveProps, setSaveProps] = React.useState(false)
  const InputBoxRef = React.useRef<React.MutableRefObject<any> | any>()
  // React.useEffect(() => {
  //   if (processName === "Discard" && withoutSave && props.firstTimeChange) {
  //     setActiveDescriptionText(defaultValue)
  //     InputBoxRef.current.value = defaultValue
  //   } else if (processName === "Discard" && withoutSave) {
  //     InputBoxRef.current.value = props.defaultValue
  //     setActiveDescriptionText(props.defaultValue)
  //   } else if (processName === "Discard") {
  //     if (defaultValue.length == 2) {
  //       setActiveDescriptionText(props.defaultValue)
  //       InputBoxRef.current.value = props.defaultValue
  //     } else if (defaultValue.length > 2) {
  //       setActiveDescriptionText(defaultValue)
  //       InputBoxRef.current.value = defaultValue[defaultValue.length - 2]
  //     } else {
  //       setActiveDescriptionText(defaultValue)
  //       InputBoxRef.current.value = defaultValue[0]
  //     }
  //   }
  // }, [processName])

  const handleDescriptionBoxSubmit = async (e: any) => {
    e.preventDefault()

    if (activeDescriptionText === "") {
    } else if (
      activeDescriptionText !== "" &&
      activeDescriptionText !== props.defaultValue
    ) {
      if (processName === "Save") {
        await axios
          .put(`project/detail/${props.id}`, {
            user: props.user,
            typeofproject: props.typeofproject,
            description: activeDescriptionText
          })
          .then(res => {
            // setWithoutSave(false)
            // setDefaultValue([...defaultValue, res.data.description])
            props.callbackFunction()
          })
          .catch(err => prompt(err.response))
      }
    }
  }
  const handleDescriptionForMilestone = async (e: any) => {
    e.preventDefault()
    console.log("descr", props.milestoneid)
    if (activeDescriptionText === "") {
    } else {
      if (processName === "Save") {
        await axios
          .put(`project/detail/milestones/${props.milestoneid}`, {
            description: activeDescriptionText
          })
          .then(res => {
            console.log("YOVVVV")
            // setWithoutSave(false)
            props.callbackFunction()
          })
          .catch(err => console.log(err))
      }
    }
  }

  return (
    <>
      <DescriptionBoxContainer>
        <form
          onSubmit={
            props.typemilestone
              ? handleDescriptionForMilestone
              : handleDescriptionBoxSubmit
          }
          id="descriptionboxform"
          style={{ display: "flex", width: "100%", flexDirection: "column" }}
        >
          <TextField
            style={{
              fontFamily: "aileron",
              all: "inherit",
              flexBasis: "100%",
              cursor: "text"
            }}
            ref={InputBoxRef}
            onChange={(e: any) => {
              setActiveDescriptionText(e.target.value)
            }}
            onFocus={e => {
              setActiveDescriptionText("")
            }}
            onBlur={e => {
              if (activeDescriptionText === "") {
                setActiveDescriptionText(props.defaultValue)
              }
            }}
            value={activeDescriptionText}
            type="text-area"
            multiline={true}
            InputProps={{
              disableUnderline: true,
              style: {
                all: "inherit",
                color: "rgba(240, 240, 255, 0.7)",
                fontSize: "15px"
              }
            }}
            rowsMax={props.typemilestone ? 6 : 20}
            error={activeDescriptionText?.length > 4999}
            helperText={
              activeDescriptionText.length > 4999 &&
              "The description text  cannot be more than 5000 character"
            }
          ></TextField>
        </form>
      </DescriptionBoxContainer>
      <SaveDiscardContainer>
        <IconButton
          disabled={
            activeDescriptionText === props.defaultValue ||
            activeDescriptionText === ""
          }
          onClick={() => {
            setProcessName("Save")
            setSaveProps(true)
          }}
          id="savebutton"
          type="submit"
          form="descriptionboxform"
        >
          <SaveIcon src={AcceptIcon}></SaveIcon>
        </IconButton>
        <IconButton
          disabled={
            activeDescriptionText === props.defaultValue ||
            activeDescriptionText === ""
          }
          onBlur={() => {
            setProcessName("")
          }}
          onClick={() => {
            setActiveDescriptionText(props.defaultValue)
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
