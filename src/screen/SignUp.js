import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "./routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import {FatLink} from "../components/shared";
import PageTitle from "../components/PageTitle";
import {useForm} from "react-hook-form";
import {gql, useMutation} from "@apollo/client";
import { useHistory } from "react-router-dom";

const CREATEACCOUNT_MUTATION = gql `
    mutation  createAccount($name:String!,$username:String!, $email:String!, $password: String!) {
        createAccount(name:$name, username:$username, email:$email, password:$password) {
            ok
            error
        }
    }
`

const HeaderContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`

function SignUp() {
    const history = useHistory();
    const onCompleted = (data) => {
        const {username, password} = getValues()
        const {createAccount : {ok, error},
        } = data;
        if(!ok) {
            return;
        }
        history.push(routes.home, {message:"회원가입이 완료되었습니다! 로그인을 해주세요.", username, password});
    }
    const {register, handleSubmit, errors, setError, formState, getValues} = useForm(
        {mode: "onChange"}
    );

    const [createAccount, {
            loading
        }
    ] = useMutation(CREATEACCOUNT_MUTATION, {onCompleted});
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data
            }
        })
    }

    return (
        <AuthLayout>
            <PageTitle title="Sign Up"/>
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                    <Subtitle>
                        친구들의 사진과 동영상을 보려면
                        <br/>
                        가입하세요.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        ref={register({
                            required: "사용자 아이디를 입력해주세요",
                            minLength: {
                                value: 4,
                                message: "사용자 이름은 최소 4자 이상이여야 합니다"
                            }
                        })}
                        name="username"
                        type="text"
                        placeholder="사용자 아이디"/>
                    <Input
                        ref={register({required: "성명을 입력해주세요"})}
                        name="name"
                        type="text"
                        placeholder="성명"/>
                    <Input
                        ref={register({required: "이메일 주소를입력해주세요"})}
                        name="email"
                        type="text"
                        placeholder="이메일 주소"/>
                    <Input
                        ref={register({
                            required: "비밀번호를 입력해주세요",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상이여야 합니다"
                            }
                        })}
                        name="password"
                        type="password"
                        placeholder="비밀번호"/>
                    <Button
                        type="submit"
                        value={loading
                            ? "진행 중입니다"
                            : "회원가입"}
                        disabled={!formState.isValid || loading}/>
                </form>
            </FormBox>
            <BottomBox cta="계정이 있으신가요?" linkText="로그인" link={routes.home}/>
        </AuthLayout>
    )
}

export default SignUp