import { TextField } from "@material-ui/core"
import styled from "styled-components"
export interface DescriptionBoxTextAreaProps {}

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
  background-color: transparent;
`

const DescriptionBoxTextArea: React.FC<DescriptionBoxTextAreaProps> = () => {
  return (
    <>
      <DescriptionInput></DescriptionInput>
    </>
  )
}

export default DescriptionBoxTextArea
