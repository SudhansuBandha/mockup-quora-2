import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useQuestionContext } from "../../context/questions_context";
import styled from "styled-components";

export default function QuestionModal({ open, onClose }) {
  const {
    questionState,
    postQuestion,
    question_refresh,
    trigger_point,
    setTriggerPoint,
  } = useQuestionContext();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const [control, setControl] = useState(false);

  /*------------*/
  const Close = () => {
    onClose();
    question_refresh();
    setIsPosted(false);
    setControl(false);
    setTriggerPoint(!trigger_point);
    setTextAreaValue("");
  };

  const send = (e) => {
    setControl(true);
  };
  useEffect(() => {
    if (control) {
      const question = textAreaValue;
      postQuestion({ question });
    }
  }, [control]);

  useEffect(() => {
    if (Object.keys(questionState.posted_question).length > 0)
      setIsPosted(true);
  }, [questionState.posted_question]);

  if (!open) return null;

  var FT = <FontAwesomeIcon icon={faTimes} />;
  return ReactDom.createPortal(
    <Container>
      <div className="overlay-modal" onClick={Close} />
      <div className="style-modal">
        <div className="top">
          <div className="modal-title">
            <h3>Add Question</h3>
          </div>
          <div className="close" onClick={Close}>
            {FT}
          </div>
        </div>

        <div className="middle">
          {isPosted ? (
            <div className="middle-content">Posted Successfully</div>
          ) : (
            <div className="middle-content">
              <textarea
                type="text"
                className="middle-content-input"
                placeholder="Enter Your Question"
                onChange={(e) => setTextAreaValue(e.target.value)}
                rows={5}
              />
            </div>
          )}
        </div>
        <div className="bottom">
          {isPosted ? (
            <div></div>
          ) : (
            <div className="bottom-add-question link-blue" onClick={send}>
              Add Question
            </div>
          )}
        </div>
      </div>
    </Container>,
    document.getElementById("portal")
  );
}

const Container = styled.div`
  .style-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: gainsboro;
    box-sizing: border-box;
    z-index: 1000;
    height: auto;
    width: 590px;
    border-radius: 10px;

    @media screen and (max-width: 600px) {
      width: 80vw;
    }
  }
  .overlay-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(39, 37, 37, 0.7);
    z-index: 1000;
  }
  .top {
    height: 54px;
    display: flex;

    border-bottom: #bdbebf 2px solid;
  }
  .middle {
    height: 150px;
    background-color: #fff;
  }
  .middle-content {
    padding: 10px;
    font-size: 17px;
  }
  .middle-content-input {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: groove;
    width: 100%;
    overflow-wrap: break-word;
    background-color: #eee;
  }
  .middle-content-input:focus {
    outline: none;
  }
  .modal-title {
    margin-left: 27.5%;
    margin-top: 10px;
    @media screen and (max-width: 590px) {
      margin-left: 2%;
    }
    @media screen and (max-width: 420px) {
      h3 {
        font-size: 1.5rem;
      }
    }
  }
  .close {
    font-size: 25px;
    margin-left: 27.5%;
    margin-top: 2%;

    border-radius: 50%;
    height: 35px;
    width: 35px;
    text-align: center;
    padding-top: 4px;
  }
  .close:hover {
    background-color: #f2f4f7;
    cursor: pointer;
  }

  .bottom {
    height: 54px;
    display: flex;
    border-top: #bdbebf 2px solid;
    justify-content: center;
    align-items: center;
  }

  .bottom-add-question {
    background: #ad0707;
    height: 25px;
    width: auto;
    border-radius: 40px;
    padding: 0 10px 0 10px;
  }
  .bottom-add-question:hover {
    color: #fff;
    background-color: #ad0312;
    cursor: pointer;
  }
`;
