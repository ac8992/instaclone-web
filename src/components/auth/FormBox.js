import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    form {
        margin-top: 35px;
        display: flex;
        justify-items: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`

function FormBox({children}) {
    return <Container>{children}</Container>
}

export default FormBox;