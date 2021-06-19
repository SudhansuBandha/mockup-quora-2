import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { useQuestionContext } from "../../context/questions_context";
import styled from "styled-components";
function DeleteQuestion({ open, onClose, props, id, question }) {
  const {
    questionState,
    question_refresh,
    deleteQuestion,
    trigger_point,
    setTriggerPoint,
  } = useQuestionContext();
  const [control, setControl] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  //const dispatch = useDispatch()
  //const user = useSelector(state=>state.userLoggedin)
  //const {userInfo1} = user

  const Close = () => {
    onClose();
    question_refresh();
    setControl(false);
    setTriggerPoint(!trigger_point);
  };
  const onDelete = () => {
    setControl(true);
  };
  useEffect(() => {
    if (control) {
      deleteQuestion({ id });
    }
  }, [control]);
  useEffect(() => {
    if (Object.keys(questionState.delete_question).length > 0)
      setIsDeleted(true);
  }, [questionState.delete_question]);

  if (!open) return null;
  return ReactDom.createPortal(
    <Container>
      <div className="overlay-modal" onClick={Close} />
      <div className="delete-modal">
        <div className="top">
          <div className="delete-modal-title">
            <h3>Delete Questions</h3>
          </div>
        </div>

        <div className="delete-middle">
          {isDeleted ? (
            <h4>Your Question was deleted successfully</h4>
          ) : (
            <div>
              <h4>Do you want to delete your question??</h4>
              <p>{question}</p>
            </div>
          )}
        </div>
        <div className="delete-bottom">
          <div className="bottom-cancel-button" onClick={Close}>
            Cancel
          </div>

          <div className="bottom-delete-button" onClick={onDelete}>
            Delete
          </div>
        </div>
        <div></div>
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
    padding: 20px 20px 20px 40px;
    /*border-bottom: #ad0312 5px solid;*/
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
    border-top: #bdbebf 2px solid;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
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
export default DeleteQuestion;
