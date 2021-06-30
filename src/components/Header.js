import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import {Link} from "react-router-dom";
import routes from "../screen/routes";
import useUser from "../hooks/useUser";
import Avatar from "../components/auth/Avatar";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 15px;
`;

const Column = styled.div``;

const Button = styled.span `
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 5px 15px;
    color: white;
    font-weight: 600;
`

const IconsContainer = styled.div `
    display: flex;
    align-items: center;
`

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const {data} = useUser();
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <Link to={"/"} >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </Link>
                </Column>
                    <Column>
                    {isLoggedIn ? (
                        <IconsContainer>
                        <Icon>
                            <FontAwesomeIcon icon={faHome} size="2x" />
                        </Icon>
                        <Icon>
                            <FontAwesomeIcon icon={faCompass} size="2x" />
                        </Icon>
                        <Icon>
                            <Link to={`/users/${data?.me?.username}`} >
                                <Avatar url={data?.me?.avatar}/>
                            </Link>
                        </Icon>
                        </IconsContainer>
                    ) : (
                        <Link href={routes.home}>
                            <Button>Login</Button>
                        </Link>
                    )}
                        
                    </Column>
            </Wrapper>
        </SHeader>
    )
}

export default Header