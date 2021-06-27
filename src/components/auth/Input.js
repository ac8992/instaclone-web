import styled from "styled-components";

const SInput = styled.input`
width: 100%;
border-radius: 5px;
padding: 7px;
background-color: #FAFAFA;
border: 0.5px solid ${props => props.theme.borderColor};
margin-top: 5px;
box-sizing: border-box;
&::placeholder {
    font-size: 12px; 
}
`
function Input(props) {
    return <SInput {...props} />;
}

export default Input;