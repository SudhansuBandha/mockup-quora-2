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
import EditModal from "../../modals/EditModal";
import DeleteQuestion from "../../modals/DeleteQuestion";
import TextEditor from "../../editor/Editor";
import { useQuestionContext } from "../../../context/questions_context";
import styled from "styled-components";
import Axios from "axios";
import { useUserContext } from "../../../context/user_account_context";

const IndividualQuestion = ({ question }) => {
  var pencil = <FontAwesomeIcon icon={faPencilAlt} />;
  var wifi = <FontAwesomeIcon icon={faWifi} />;
  var share = <FontAwesomeIcon icon={faShare} />;
  var trash = <FontAwesomeIcon icon={faTrashAlt} />;
  var editIcon = <FontAwesomeIcon icon={faTh} />;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [textvalue, setTextValue] = useState("");
  const [answers, setAnswers] = useState(0);
  const [loading, setLoading] = useState(false);

  const { trigger_point } = useQuestionContext();
  const { userState } = useUserContext();
  useEffect(() => {
    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/answers/question/" +
        question._id
    ).then((response) => {
      setAnswers(response.data.length);
    });
  }, []);
  useEffect(() => {
    Axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/answers/question/" +
        question._id
    ).then((response) => {
      setAnswers(response.data.length);
    });
  }, [trigger_point]);
  return (
    <Container>
      <Link
        to=""
        // to ={"/"+props.question._id}
        target="_blank"
      >
        <h6 className="card-title">
          <strong>{question.question}</strong>
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
              setQuestionId(question._id);
            }}
          >
            {pencil} Answer
          </div>
        </div>

        {userState.profile._id === question.user && (
          <div className="card-question-bottom-right">
            <div className="question-edit">
              <div
                data-tip
                data-for="editTip"
                className="share"
                onClick={() => {
                  setEditOpen(true);
                  setEditId(question._id);
                  setTextValue(question.question);
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
                  setDeleteId(question._id);
                  setTextValue(question.question);
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

      {questionId === question._id ? (
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
      {deleteId === question._id ? (
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
      {editId === question._id ? (
        <EditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          id={editId}
          textvalue={textvalue}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
};

const Container = styled.div`
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
  .question-share {
    padding-right: 5px;
    padding-left: 5px;
  }
  .question-share:hover {
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
`;
export default IndividualQuestion;
