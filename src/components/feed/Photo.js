import PropTypes from "prop-types";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart, faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../auth/Avatar";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import {Link} from "react-router-dom";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const DELETE_PHOTO_MUTATION = gql`
    mutation deletePhoto($id: Int!) {
        deletePhoto(id: $id){
            ok
            error
        }
    }
`

const PhotoContainer = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 20px;
    max-width : 615px;
    border-radius: 5px;
`
const PhotoHeader = styled.div`
    padding: 15px;
    display : flex;
    align-items: center;
`

const Username = styled(FatText)`
    margin-left: 15px;
`

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`

const PhotoData =styled.div`
    padding: 15px;
`

const PhotoActions =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
`

const PhotoAction = styled.div `
    margin-right: 10px;
    cursor: pointer;
`

const Likes = styled(FatText)`
    margin-top : 10px;
    display: block;
`

const PhotoDelete = styled.span `
    cursor: pointer;
`



function Photo({id,user,file,isLiked,likes,caption, commentNumber, comments, isMine}) {
    const updateToggleLike = (cache, result ) => {
        const {
            data: {
                toggleLike: {ok},
            },
        } = result;
        if(ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev){
                        return !prev;
                    },
                    likes(prev) {
                        if(isLiked) {
                            return prev - 1
                        }
                        return prev + 1
                    }
                }
            })
            /* props??? ????????? ?????? ?????? ??? ????????? ?????? 
            const fragmentId = `Photo:${id}`;
            const fragment = gql`
            fragment BSName on Photo {
                isLiked, likes
            }`;
            const result = cache.readFragment({
                id: fragmentId,
                fragment,
            })
            if("isLiked" in result && "likes" in result) {
                const {isLiked: cacheIsLiked, likes: cacheLikes} = result;
                cache.writeFragment({
                    id:`Photo:${id}`,
                    fragment: gql`
                    fragment BSName on Photo {
                        isLiked, likes
                    }`,
                    data: {
                        isLiked: !isLiked,
                        likes: isLiked ? likes - 1 : likes + 1
                    }
                })
            } */

            /* cache.writeFragment({
                id:`Photo:${id}`,
                fragment: gql`
                fragment BSName on Photo {
                    isLiked, likes
                }`,
                data: {
                    isLiked: !isLiked,
                    likes: isLiked ? likes - 1 : likes + 1
                }
            }) */
        }
    }
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
          id,
        },
        update: updateToggleLike,
    })
    const [deletePhotoMutation] = useMutation(DELETE_PHOTO_MUTATION, {
        variables: {
            id,
        },
    })
    return (
        <PhotoContainer key={id}>
                <PhotoHeader>
                    <Link to={`/users/${user.username}`} >
                        <Avatar url={user.avatar} />
                    </Link>
                    <Link to={`/users/${user.username}`} >
                        <Username>{user.username}</Username>
                    </Link>
                    {isMine ? <PhotoDelete onClick={deletePhotoMutation}><FontAwesomeIcon style={{color:"tomato"}} icon={faTimes} /></PhotoDelete> : null}
                </PhotoHeader>
                    <PhotoFile src={file} />
                    <PhotoData>
                        <PhotoActions>
                            <div>
                                <PhotoAction onClick={toggleLikeMutation}>
                                    <FontAwesomeIcon
                                    style={{color: isLiked ? "tomato" : "inherit"}}
                                    size={"2x"} icon={isLiked? SolidHeart : faHeart} />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon size={"2x"} icon={faComment} />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                                </PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon size={"2x"} icon={faBookmark} />
                            </div>
                        </PhotoActions>
                        <Likes>{`????????? ${likes}???`}</Likes>
                        <Comments photoId={id} author={user.username} caption={caption} comments={comments} commentNumber={commentNumber} />
                    </PhotoData>
            </PhotoContainer>
    )
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    isMine: PropTypes.bool.isRequired,
    commentNumber: PropTypes.number,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.shape({
                avatar: PropTypes.string,
                username: PropTypes.string.isRequired,
            }),
            payload: PropTypes.string.isRequired,
            isMine: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    )
}

export default Photo;