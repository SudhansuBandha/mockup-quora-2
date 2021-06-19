import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faWifi,
  faShare,
  faTrashAlt,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import EditModal from "../modals/EditModal";
import DeleteQuestion from "../modals/DeleteQuestion";
import TextEditor from "../editor/Editor";
import { useQuestionContext } from "../../context/questions_context";
import { useUserContext } from "../../context/user_account_context";
import Axios from "axios";
import styled from "styled-components";

const HomeScreenQuestion = (props) => {
  //console.log(props);

  var pencil = <FontAwesomeIcon icon={faPencilAlt} />;
  var wifi = <FontAwesomeIcon icon={faWifi} />;
  var share = <FontAwesomeIcon icon={faShare} />;
  var trash = <FontAwesomeIcon icon={faTrashAlt} />;
  var editIcon = <FontAwesomeIcon icon={faTh} />;

  //const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [textvalue, setTextValue] = useState("");
  const [answers, setAnswers] = useState(0);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  let info = "";
  const { trigger_point } = useQuestionContext();
  const { userState, decode } = useUserContext();
  info = decode();

  useEffect(() => {
    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/answers/question/" +
        props.question._id
    ).then((response) => {
      setAnswers(response.data.length);
    });

    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/activity/date/" +
        props.question.date
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
      "https://mockup-quora-backend.herokuapp.com/api/answers/question/" +
        props.question._id
    ).then((response) => {
      setAnswers(response.data.length);
    });
    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/activity/date/" +
        props.question.date
    )
      .then((date) => {
        setDate(date.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trigger_point]);

  return (
    <Container>
      <div className="homescreen-question-card">
        <div className="homescreen-question-userinfo">
          {info && info.id === props.question.user_id ? (
            <div>You have asked this on {date}</div>
          ) : (
            <div>
              <Link
                to={"/quora/profile/user/" + props.question.user_id}
                className="username-link"
              >
                {props.question.username}
              </Link>{" "}
              has asked this on {date}
            </div>
          )}
          <Link
            to=""
            // to ={"/"+props.question._id}
            target="_blank"
          >
            <h6 className="card-title">
              <strong>{props.question.question}</strong>
            </h6>
          </Link>
          <div className="card-question-details">
            <Link
              to=""
              /*to={"/" + props.question._id}*/
              target="_blank"
            >
              <div className="white-question">
                <p>
                  <strong>{answers} Answers</strong>
                </p>
              </div>
            </Link>
          </div>

          <div className="card-question-bottom">
            <div className="card-question-bottom-left">
              <div
                className="question-pencil"
                onClick={() => {
                  setQuestionId(props.question._id);
                }}
              >
                {pencil} Answer
              </div>
            </div>

            {userState.profile._id === props.question.user_id && (
              <div className="card-question-bottom-right">
                <div className="question-edit">
                  <div
                    data-tip
                    data-for="editTip"
                    className="share"
                    onClick={() => {
                      setEditOpen(true);
                      setEditId(props.question._id);
                      setTextValue(props.question.question);
                    }}
                  >
                    {editIcon}
                  </div>

                  <ReactTooltip id="editTip" place="top" effect="solid">
                    Edit
                  </ReactTooltip>
                </div>

                <div className="question-delete">
                  <div
                    data-tip
                    data-for="deleteTip"
                    onClick={() => {
                      setDeleteOpen(true);
                      setDeleteId(props.question._id);
                      setTextValue(props.question.question);
                    }}
                  >
                    {trash}
                  </div>

                  <ReactTooltip id="deleteTip" place="top" effect="solid">
                    Delete
                  </ReactTooltip>
                </div>
              </div>
            )}
          </div>

          {questionId === props.question._id ? (
            <div>
              <TextEditor
                id={questionId}
                type="question"
                onClose={() => {
                  setQuestionId("");
                }}
              />
            </div>
          ) : (
            <div></div>
          )}
          {deleteId === props.question._id ? (
            <DeleteQuestion
              open={deleteOpen}
              onClose={() => {
                setDeleteOpen(false);
              }}
              id={deleteId}
              question={textvalue}
            />
          ) : (
            <div></div>
          )}
          {editId === props.question._id ? (
            <EditModal
              open={editOpen}
              onClose={() => setEditOpen(false)}
              id={editId}
              textvalue={textvalue}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .homescreen-question-card {
    /*padding-top: 20px;*/
    width: 100%;
    border-bottom: solid 2px #e3e8e5;
    background-color: #fff;
  }
  .homescreen-question-userinfo {
    font-size: 12px;
    font-style: italic;
  }
  .card-title {
    word-wrap: break-word;
    color: black;
  }
  .card-title:hover {
    color: black;
    text-decoration: underline;
  }
  .card-question-details {
    display: flex;
  }
  .card-question-details > p {
    padding: 0 2px 0 2px;
    color: #989898;
    font-size: 14px;
  }
  .card-separator {
    margin-top: -3.5px;
  }
  .card-question-bottom {
    margin-top: -10px;
    color: #2962e6;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    height: 30px;
    margin-bottom: 5px;
  }
  .card-question-bottom-left {
    display: flex;
  }
  .question-pencil {
    padding-right: 11px;
    padding-left: 4px;
    padding-top: 2px;
    width: max-content;
  }
  .question-pencil:hover {
    background-color: #edeff2;
    border-radius: 40px;
    cursor: pointer;
  }

  .card-question-bottom-right {
    display: flex;
    font-size: 18px;
    color: #989898;
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
  .username-link:hover {
    text-decoration: underline !important;
  }
`;
export default HomeScreenQuestion;
