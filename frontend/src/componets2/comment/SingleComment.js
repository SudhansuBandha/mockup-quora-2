import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import ReactRoundedImage from "react-rounded-image";
import { useUserContext } from "../../context/user_account_context";
import Axios from "axios";

function SingleComment(props) {
  var trash_small = <FontAwesomeIcon icon={faTrashAlt} size="sm" />;
  const [date, setDate] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const { userState } = useUserContext();
  useEffect(() => {
    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/activity/date/" +
        props.comment.date
    )
      .then((date) => {
        setDate(date.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/profile/image_url/" +
        props.comment.user._id
    ).then((res) => {
      setProfilePic(res.data);
    });
  });
  return (
    <Container>
      <div className="individual-comment" key={props.comment._id}>
        <div className="comment-user">
          <div>
            <ReactRoundedImage
              image={profilepic}
              imageWidth="36"
              imageHeight="36"
              roundedSize="0"
            />
          </div>
          <div className="comment-user-details">
            <p className="" style={{ paddingRight: "5px" }}>
              <strong>{props.comment.user.username}</strong>
            </p>
            <p className="white card-separator" style={{ paddingRight: "5px" }}>
              .
            </p>
            <p className="white">{date}</p>
          </div>
        </div>
        <div className="particular-comment">{props.comment.content}</div>

        <div className="comment-buttons">
          <div style={{ width: "500px" }}>
            {/*<ReplyComment CommentLists={props.CommentLists} parentCommentId={props.comment._id} answerId={props.comment.answerId}  />*/}
          </div>
          {userState.profile._id === props.comment.user._id && (
            <div>
              {" "}
              <div
                className="comment-delete"
                data-tip
                data-for="deleteCommentTip"
                onClick={(e) => {
                  props.deleteComment(props.comment._id);
                }}
              >
                {trash_small}
              </div>
              <ReactTooltip id="deleteCommentTip" place="top" effect="solid">
                Delete Comment
              </ReactTooltip>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .individual-comment {
    min-height: 80px;
    padding: 7px 10px 0px 10px;
    background-color: #fff;
    border: 1px solid #dee3e0;
    border-bottom: none;
  }
  .comment-user {
    display: flex;
    height: 40px;
  }
  .comment-user-details {
    margin-left: 15px;
    display: flex;
    font-size: 14px;
  }
  .particular-comment {
    width: 80%;
    min-height: 20px;
    margin-left: 50px;
    margin-top: -17px;
  }
  .comment-buttons {
    display: flex;
    margin-left: 8.4%;
    color: #989898;
  }
  .comment-edit {
    padding-right: 4px;
    padding-left: 4px;
    margin-top: -1px;
  }
  .comment-edit:hover {
    cursor: pointer;
    background-color: #edeff2;
    border-radius: 50%;
  }
  .comment-delete {
    padding-right: 4px;
    padding-left: 4px;
    margin-top: -1px;
  }
  .comment-delete:hover {
    cursor: pointer;
    background-color: #edeff2;
    border-radius: 50%;
  }
`;

export default SingleComment;
