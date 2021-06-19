import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { useAnswerContext } from "../../context/answers_context";
import styled from "styled-components";
function DeleteAnswer({ open, onClose, props, id }) {
  const {
    answerState,
    answer_refresh,
    deleteAnswer,
    answerTrigger,
    setAnswerTrigger,
  } = useAnswerContext();
  const [control, setControl] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const Close = () => {
    onClose();
    answer_refresh();
    setControl(false);
    setAnswerTrigger(!answerTrigger);
  };

  const onDelete = () => {
    setControl(true);
  };

  useEffect(() => {
    if (control) {
      deleteAnswer({ id });
    }
  }, [control]);

  useEffect(() => {
    if (Object.keys(answerState.deleted_answer).length > 0) setIsDeleted(true);
  }, [answerState.deleted_answer]);

  if (!open) return null;

  return ReactDom.createPortal(
    <Container>
      <div className="overlay-modal" onClick={Close} />
      <div className="delete-modal">
        <div className="top bg-color">
          <div className="delete-modal-title">
            <h3>Delete Answer</h3>
          </div>
        </div>

        <div className="delete-middle">
          {isDeleted ? (
            <h4>Your Answer was deleted successfully</h4>
          ) : (
            <h4>Do you want to delete your answer??</h4>
          )}

          <div className="delete-bottom">
            <div className="bottom-cancel-button" onClick={Close}>
              Cancel
            </div>
            <div className="bottom-delete-button" onClick={onDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </Container>,
    document.getElementById("portal")
  );
}

const Container = styled.div`
  .delete-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: gainsboro;
    box-sizing: border-box;
    z-index: 1000;
    height: auto;
    width: 500px;
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
    justify-content: center;
    border-bottom: #bdbebf 2px solid;
  }
  .delete-middle {
    background-color: #fff;
    padding: 10px 20px 20px 40px;
    @media screen and (max-width: 420px) {
      h3 {
        font-size: 1.25rem;
      }
    }
  }

  .delete-modal-title {
    margin-top: 10px;

    @media screen and (max-width: 420px) {
      h3 {
        font-size: 1.5rem;
      }
    }
  }

  .delete-bottom {
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    margin-left: -70px;
    @media screen and (max-width: 420px) {
      margin-left: -50px;
    }
  }
  .bottom-cancel-button {
    height: 35px;
    width: 80px;
    border-radius: 40px;
    padding: 5px 10px 5px 15px;
    margin: 5%;
    margin-bottom: none;
    background-color: #ccc;
  }
  .bottom-cancel-button:hover {
    cursor: pointer;
    background-color: #5c5b54;
  }
  .bottom-delete-button {
    background: #edda0c;
    height: 35px;
    width: 80px;
    border-radius: 40px;
    padding: 5px 8px 5px 17px;
  }
  .bottom-delete-button:hover {
    cursor: pointer;
    background-color: #7a6c05;
  }
`;
export default DeleteAnswer;
