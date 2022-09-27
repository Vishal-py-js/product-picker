import React from 'react'
import styled from 'styled-components'


const CheckboxContainer = styled.div`
    display: flex;
    vertical-align: middle;
    width: 22px;
    height: 22px; 
    cursor: pointer;
`

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 3px;
    visibility: ${props=>props.checked?"visible":"hidden"};
`

const HiddenCheckbox = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    background-color: gray;
`

const StyledCheckbox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: ${props => (props.checked ? 'rgba(0, 128, 96, 1)' : '')};
    border: 1px solid gray;
    border-radius: 4px;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px pink;
    }
`

const Checkbox = ({checked, handleSelect }) => (
  <CheckboxContainer onClick={handleSelect}>
    <HiddenCheckbox type="checkbox" checked={checked} onChange={handleSelect}/>
    <StyledCheckbox checked={checked} >
      <Icon checked={checked} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox