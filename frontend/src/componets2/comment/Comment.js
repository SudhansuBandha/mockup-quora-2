import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ReactRoundedImage from "react-rounded-image";
import SingleComment from "./SingleComment";
import styled from "styled-components";
import { useUserContext } from "../../context/user_account_context";
import { useCommentContext } from "../../context/comments_context";

function Comment(props) {
  var trash_small = <FontAwesomeIcon icon={faTrashAlt} size="sm" />;
  var plus = <FontAwesomeIcon icon={faPlusCircle} />;

  const { userState } = useUserContext();
  const { postComment, deleteComment, commentTrigger, setCommentTrigger } =
    useCommentContext();

  const [commentText, setCommentText] = useState("");

  const register = (answer_id) => {
    const comment = commentText;
    const id = answer_id;
    postComment({ id, comment });
    setCommentTrigger(!commentTrigger);
  };

  const remove = (comment_id) => {
    const id = comment_id;
    deleteComment({ id });
    setCommentTrigger(!commentTrigger);
  };

  return (
    <Container>
      {
        <div className="comment-section">
          <div>
            <ReactRoundedImage
              image={userState.profile.profilepic}
              imageWidth="36"
              imageHeight="36"
              roundedSize="0"
            />
          </div>
          <form className="comment-box">
            <input
              type="text"
              name=""
              className="comment-txt"
              placeholder="Add a comment"
              onChange={(e) => setCommentText(e.target.value)}
            />
          </form>
          <div
            className="cs"
            onClick={(e) => {
              register(props.answer_id);
            }}
          >
            Add Comment
          </div>
          <div
            className="cs-plus"
            onClick={(e) => {
              register(props.answer_id);
            }}
          >
            <h3>{plus}</h3>
          </div>
        </div>
      }

      {props.comments.length > 0 &&
        props.comments.map(
          (comment) =>
            !comment.responseToId && (
              <React.Fragment key={comment._id}>
                <SingleComment
                  comment={comment}
                  deleteComment={remove}
                  CommentLists={props.comments}
                />
              </React.Fragment>
            )
        )}
    </Container>
  );
}

const Container = styled.div`
  .comment-section {
    display: flex;
    height: 50px;
    padding: 7px 10px 0px 10px;
    background-color: #f5f4f0;
  }
  .comment-box {
    height: 36px;
    background: #fff;
    border-radius: 40px;
    margin-left: 10px;
    display: flex;
    margin-right: 4vw;
    @media screen and (max-width: 800px) and (min-width: 600px) {
      margin-right: 10vw;
    }
    @media screen and (max-width: 380px) {
      margin-right: 2vw;
    }
  }
  .comment-txt {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding-left: 10px;
    color: black;
    font-size: 16px;
    line-height: 40px;
    width: 27vw;
    @media screen and (max-width: 550px) and (min-width: 450px) {
      width: 45vw;
    }
    @media screen and (max-width: 450px) {
      width: 52vw;
    }
  }
  .cs {
    margin-top: 3px;
    height: 30px;
    width: 120px;

    display: flex;
    justify-content: center;
    padding: 3px 5px 0 5px;
    border-radius: 40px;
    background-color: #2962e6;
    color: white;
    @media screen and (max-width: 625px) {
      font-size: 14px;
    }
    @media screen and (max-width: 550px) {
      display: none;
    }
  }

  .cs-plus {
    margin-top: 3px;
    @media screen and (min-width: 550px) {
      display: none;
    }
    h3 {
      font-size: 1.5rem;
    }
    color: #2962e6;
  }
  .cs:hover,
  .cs-plus:hover {
    cursor: pointer;
  }
`;

export default Comment;
