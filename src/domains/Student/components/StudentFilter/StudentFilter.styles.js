import { Box, Button } from '@qonsoll/react-design'

import styled from 'styled-components'

export const StyledButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 8%;
  background: rgb(255, 255, 255);
  z-index: 3;
`

export const StyledFilter = styled(Box)`
  /* background: rgba(255, 255, 255, 0.25); */
  border-radius: 0 0 24px 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 0px 32px 16px 32px;
  overflow: auto;
  min-width: 220px;

  ::-webkit-scrollbar {
    width: hidden;
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    visibility: hidden;
  }
  ::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
  ::-webkit-scrollbar-button {
    visibility: hidden;
  }
  &:hover {
    ::-webkit-scrollbar {
      visibility: visible;
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      visibility: visible;
      background-color: transparent;
      border-radius: 100px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    ::-webkit-scrollbar-thumb {
      visibility: visible;
      border-radius: 100px;
      background-image: linear-gradient(
        to bottom,
        rgba(71, 118, 230, 0.2) 0%,
        rgba(142, 84, 233, 0.2) 51%,
        rgba(71, 118, 230, 0.2) 100%
      );
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    }
    ::-webkit-scrollbar-button {
      visibility: visible;
      background: transparent;
    }
  }
`

export const StyledHeader = styled(Box)`
  border-radius: 24px 24px 0 0;
  z-index: 1;
  padding: 16px 32px 0px 32px;
  display: flex;
  justify-content: space-between;
`

export const StyledDetails = styled.details`
  & > summary {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 16px;
  }
  details {
    margin-left: 16px;
    & > summary {
      font-size: 14px;
      margin-bottom: 8px;
      margin-top: 8px;
    }
    div {
      margin-left: 8px;
    }
  }
  div {
    margin-left: 16px;
  }
`
