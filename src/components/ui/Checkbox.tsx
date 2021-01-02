import React from "react"
import styled from "styled-components"
import Radio from "@material-ui/core/Radio"
import clsx from "clsx"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { makeStyles } from "@material-ui/core"
import { FirstLogo, SecondLogo } from "./RadioButtons"
// Inspired by blueprintjs

export const LabelText = styled.span`
  width: 98px;
  color: rgba(240, 240, 255, 1);
  height: 22px;
  font-family: Aileron;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`
interface CheckBoxProps {
  setvalue: any
  value: string
}

const Checkbox: React.FC<CheckBoxProps> = props => {
  return (
    <FormControl component="fieldset" required>
      <RadioGroup value={props.value} onChange={props.setvalue}>
        <FormControlLabel
          value="S"
          control={
            <Radio
              defaultChecked
              icon={<FirstLogo />}
              checkedIcon={<SecondLogo />}
              color="default"
            />
          }
          label={<LabelText>Step By Step</LabelText>}
        />
        <FormControlLabel
          value="A"
          control={
            <Radio
              icon={<FirstLogo />}
              checkedIcon={<SecondLogo />}
              color="default"
            />
          }
          label={<LabelText>All at Once</LabelText>}
        />
        <FormControlLabel
          value="C"
          control={
            <Radio
              icon={<FirstLogo />}
              checkedIcon={<SecondLogo />}
              color="default"
            />
          }
          label={<LabelText>Cycle Up</LabelText>}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default Checkbox
