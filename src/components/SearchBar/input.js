import styled from "styled-components";

const InputWrapper = styled.input`

    width: 100%;
    :focus{
            outline: none;
        }
    border: 1px solid black;
    border: none;
    padding: 5px 0;
    font-size: 17px;
    
`

const Input = ({value, onChange, onFocus, placeholder}) => {
    return (
        <InputWrapper placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} >
            
        </InputWrapper>
    )
}
export default Input