import { Alert, AlertTitle } from "@material-ui/lab"
import styled from "styled-components"
export interface ErrorBoxProps {
  error: string
}

const ErrorBox: React.FC<ErrorBoxProps> = props => {
  const ErrorContainer = styled.div<{ error: string }>`
    display: flex;
    width: 100%;
    justify-content: center;
    justify-self: center;
    opacity: ${props.error ? "1" : "0"};
    transition: opacity 100s linear;
    position: absolute;
    z-index: 9999;
  `

  return (
    <ErrorContainer error={props.error}>
      <Alert
        closeText="close"
        style={{ width: "50%", height: "fit-content" }}
        severity="error"
      >
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>{props.error}!</strong>
      </Alert>
    </ErrorContainer>
  )
}

export default ErrorBox
