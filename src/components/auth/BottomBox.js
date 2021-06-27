import styled from "styled-components";
import { Link } from "react-router-dom";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
margin-top: 10px;
padding : 20px 0px;
text-align: center;
a {
    font-weight: 600;
    color:  ${props => props.theme.accent};
    text-decoration: none;
}
`;

function BottomBox({ cta, link, linkText }) {
    return (
        <SBottomBox>
            <span>{cta}</span>
            <Link to={link}> {linkText}</Link>
        </SBottomBox>
    )
}
export default BottomBox;