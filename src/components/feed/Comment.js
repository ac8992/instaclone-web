import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id:Int!) {
        deleteComment(id:$id) {
            ok
        }
    }
`

const CommentsContainer = styled.div`

`
const CommentCaption = styled.span`
    margin-left: 10px;
    a {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        &:hover {
        text-decoration: underline;
        }
    }
`
const CommentDelete = styled.span `
    cursor: pointer;
`

function Comment({id, author, payload, isMine, photoId }) {
    const updateDeleteComment = (cache, result) => {
        const {data: {deleteComment: {ok}}} = result;
        if(ok) {
            cache.evict({id:`Comment:${id}`});
            cache.modify({
                id:`Photo:${photoId}`,
                fields: {
                    commentNumber(prev) {
                        return prev - 1;
                    }
                }
            })
        }
    }
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables : {
            id
        },
        update: updateDeleteComment,
    })
    const commentDelete = () => {
        deleteCommentMutation()
    }
    // const cleanedPayload = sanitizeHtml(payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"), {allowedTags: ["mark"]})
    return (
        <CommentsContainer>
            <Link to={`/users/${author}`}>
                <FatText>{author}</FatText>
            </Link>
            {/* <CommentCaption dangerouslySetInnerHTML={{__html: cleanedPayload}}/> */}
            <CommentCaption>
                {payload.split(" ").map((word, index) => /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
                    <React.Fragment key={index}>
                        <Link to={`/hashtags${word}`}>{word}</Link>{" "}
                    </React.Fragment>
                    ) : (
                    <React.Fragment key={index}>{word}{" "}</React.Fragment>
                    )
                )}
            </CommentCaption>
            {isMine ? <CommentDelete onClick={commentDelete}><FontAwesomeIcon style={{color:"tomato"}} icon={faTimes} /></CommentDelete> : null}
        </CommentsContainer>
    )
}

Comment.propTypes = {
    id: PropTypes.number,
    photoId:PropTypes.number,
    isMine: PropTypes.bool,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
}

export default Comment; 