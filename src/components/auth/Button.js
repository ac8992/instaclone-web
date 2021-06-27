import styled from "styled-components"

const SButton = styled.input`
    width: 100%;
    border-radius: 5px;
    border: none;
    margin-top: 12px;
    background-color:  ${props => props.theme.accent};
    color: white;
    text-align: center;
    padding: 10px 0px;
    font-weight: 600;
`

function Button(props) {
    return <SButton {...props} />
}

export default Button;