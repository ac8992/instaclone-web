import styled from "styled-components";

const Contatiner = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

function AuthLayout({children}) {
    return (
    <Contatiner>
        <Wrapper>{children}</Wrapper>
    </Contatiner>
    )
}

export default AuthLayout;