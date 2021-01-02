import styled from "styled-components"
import React from "react"
import axios from "../../functions/axios"
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
  const [
    activeDescriptionText,
    setActiveDescriptionText
  ] = React.useState<string>("")
  const handleDescriptionBoxSubmit = async (e: any) => {
    e.preventDefault()
    console.log("description box sumbittied")
    if (activeDescriptionText === "") {
    } else {
      await axios
        .put(`project/detail/${props.id}`, {
          user: props.user,
          typeofproject: props.typeofproject,
          description: activeDescriptionText
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err.response))
    }
  }
  const handleDescriptionTextChange = (e: any) => {
    setActiveDescriptionText(e.target.value)
  }
  return (
    <>
      <form
        onSubmit={handleDescriptionBoxSubmit}
        id="descriptionboxform"
        style={{ display: "flex", width: "100%" }}
      >
        <DescriptionInput onChange={handleDescriptionTextChange}>
          {props.defaultValue}
        </DescriptionInput>
      </form>
    </>
  )
}

export default DescriptionBoxTextArea
