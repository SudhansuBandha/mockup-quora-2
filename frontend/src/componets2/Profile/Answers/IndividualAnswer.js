import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTh, faComment } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import DeleteAnswer from "../../modals/DeleteAnswer";
import XYZ from "../../editor/XYZ";
import "./IndividualAnswer.css";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import Comment from "../../comment/Comment";
import axios from "axios";
import Axios from "axios";
import Dislike from "./Dislike";
import Like from "./Like";
import ReactRoundedImage from "react-rounded-image";
import styled from "styled-components";
import { useCommentContext } from "../../../context/comments_context";
import { useUserContext } from "../../../context/user_account_context";

const IndividualAnswer = (props) => {
  var comment = <FontAwesomeIcon icon={faComment} />;
  var trash = <FontAwesomeIcon icon={faTrashAlt} />;
  var editIcon = <FontAwesomeIcon icon={faTh} />;

  const { commentTrigger } = useCommentContext();
  const { userState } = useUserContext();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentNumbers, setCommentNumbers] = useState(0);
  const [textvalue, setTextValue] = useState("");
  const [comments, setComments] = useState([]);
  const [loading_show_comment, setLoading] = useState(true);
  const [date, setDate] = useState(props.answer.date);
  const [likeCount, setLikeCount] = useState(0);
  const [likeAction, setLikeAction] = useState("");
  const [dislikeAction, setDislikeAction] = useState("");

  const showComment = async (answer_id) => {
    setCommentId(answer_id);
    setDeleteId("");
    setAnswerId("");
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/comment/" + answer_id;
    const data = await axios.get(url);
    setComments(data.data);
    setCommentNumbers(data.data.length);
    setLoading(false);
  };

  const length = async () => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/comment/" +
      props.answer.id;
    axios
      .get(url)
      .then((result) => {
        setCommentNumbers(result.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    length();
    if (props.condition) {
      Axios.get(
        "https://mockup-quora-backend.herokuapp.com/api/activity/date/" +
          props.answer.date
      )
        .then((date) => {
          setDate(date.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDate(props.answer.date);
    }

    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/like/getLikes/" +
        props.answer.id
    )
      .then((result) => {
        setLikeCount(result.data.likes.length);

        result.data.likes.map((like) => {
          if (like.userId === props.answer.user_id) {
            setLikeAction("liked");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/like/getDislikes/" +
        props.answer.id
    )
      .then((result) => {
        result.data.dislikes.map((dislike) => {
          if (dislike.userId === props.answer.user_id) {
            setDislikeAction("disliked");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    length();
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/comment/" +
      props.answer.id;
    axios.get(url).then((res) => {
      setComments(res.data);
    });
  }, [commentTrigger]);
  return (
    <Container>
      <div className="flex-container" style={{ height: "60px" }}>
        <div>
          <ReactRoundedImage
            image={props.answer.profilepic}
            imageWidth="42"
            imageHeight="42"
            roundedSize="0"
          />
        </div>
        <div className="user-details">
          <div className="second-flex">
            <Link to={"/profile/" + props.answer.user} target="_black">
              <p className="card-title">
                <strong>{props.answer.user}</strong>
              </p>
            </Link>
            <p className="white card-separator">.</p>
            <p className="white">{date}</p>
          </div>
          <div className="details-description" style={{ marginTop: "-15px" }}>
            <p className="white">{props.answer.description}</p>
          </div>
        </div>
      </div>
      <div style={{ height: "30px" }}>
        <Link to={"/" + props.answer.question_id} target="_blank">
          <h6 className="card-title">
            <strong>{props.answer.question}</strong>
          </h6>
        </Link>
      </div>
      <div className="answer">
        <p>{props.answer.answer}</p>
      </div>
      {sessionStorage.getItem("token") !== null ? (
        <div className="individual-answer-bottom">
          <div className="individual-answer-bottom-left">
            <Like
              likeAction={likeAction}
              setLikeAction={setLikeAction}
              likeCount={likeCount}
              setLikeCount={setLikeCount}
              dislikeAction={dislikeAction}
              setDislikeAction={setDislikeAction}
              id={props.answer.id}
            />
            <div
              className="option-comment"
              data-tip
              data-for="commentTip"
              onClick={(e) => {
                showComment(props.answer.id);
              }}
            >
              {comment}
              <div style={{ paddingLeft: "5px", marginTop: "-4px" }}>
                {commentNumbers}
              </div>
            </div>

            <ReactTooltip id="commentTip" place="top" effect="solid">
              Comment
            </ReactTooltip>
          </div>

          <div className="individual-answer-bottom-right">
            {userState.profile._id === props.answer.user_id && (
              <div className="question-edit">
                <div
                  data-tip
                  data-for="editTip"
                  className="share"
                  onClick={() => {
                    setEditOpen(true);
                    setAnswerId(props.answer.id);
                    setTextValue(props.answer.answer);
                    setCommentId("");
                    setDeleteId("");
                  }}
                >
                  {editIcon}
                </div>

                <ReactTooltip id="editTip" place="top" effect="solid">
                  Edit Answer
                </ReactTooltip>
              </div>
            )}

            {userState.profile._id === props.answer.user_id && (
              <div className="question-delete">
                <div
                  data-tip
                  data-for="deleteTip"
                  onClick={() => {
                    setDeleteOpen(true);
                    setCommentId("");
                    setAnswerId("");
                    setDeleteId(props.answer.id);
                  }}
                >
                  {trash}
                </div>

                <ReactTooltip id="deleteTip" place="top" effect="solid">
                  Delete
                </ReactTooltip>
              </div>
            )}

            <Dislike
              dislikeAction={dislikeAction}
              setDislikeAction={setDislikeAction}
              likeAction={likeAction}
              setLikeAction={setLikeAction}
              likeCount={likeCount}
              setLikeCount={setLikeCount}
              id={props.answer.id}
            />
          </div>
        </div>
      ) : (
        <div style={{ height: "20px" }}></div>
      )}

      {commentId === props.answer.id ? (
        loading_show_comment ? (
          <div className="loaders-comment">
            <LoaderDots size="small" />
          </div>
        ) : (
          <Comment
            props={props}
            comments={comments}
            answer_id={props.answer.id}
          />
        )
      ) : (
        <div></div>
      )}
      {deleteId === props.answer.id ? (
        <DeleteAnswer
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          props={props}
          id={deleteId}
        />
      ) : (
        <div></div>
      )}

      {answerId === props.answer.id ? (
        <XYZ
          id={answerId}
          onClose={() => {
            setAnswerId("");
          }}
          text={textvalue}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .question-card {
    padding-top: 10px;
    width: 95%;
    border-bottom: solid 2px #e3e8e5;
    background-color: #fff;
  }
  .flex-container {
    display: flex;
    /*flex-wrap: wrap;*/
  }
  .user-details {
    padding-left: 5px;
    width: 90%;
    margin-top: 0px;
  }
  .second-flex {
    display: flex;
    /*flex-wrap: wrap;*/
  }
  .card-title {
    word-wrap: break-word;
    color: black;
  }
  .card-title:hover {
    color: black;
    text-decoration: underline;
  }
  .card-separator {
    margin-top: -3.5px;
  }
  .details-description {
    min-height: 42px;
    word-wrap: break-word;
    font-style: italic;
    font-size: 0.9rem;
  }
  .individual-answer-bottom {
    margin-top: -10px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    height: 30px;
    margin-bottom: 5px;
  }
  .individual-answer-bottom-left {
    display: flex;
    width: 35%;
  }
  .option-comment {
    display: flex;
    padding-left: 10px;
    padding-top: 9px;
    color: #2962e6;
  }
  .option-comment:hover {
    cursor: pointer;
  }
  .question-edit {
    padding-top: 1px;
    padding-right: 8px;
    padding-left: 8px;
  }
  .question-edit:hover {
    cursor: pointer;
    background-color: #edeff2;
    border-radius: 50%;
  }
  .question-delete {
    padding-right: 6px;
    padding-left: 6px;
    padding-top: 1px;
  }
  .question-delete:hover {
    cursor: pointer;
    background-color: #edeff2;
    border-radius: 50%;
  }
  .loaders-comment {
    margin-left: 5%;
  }
`;

export default IndividualAnswer;
