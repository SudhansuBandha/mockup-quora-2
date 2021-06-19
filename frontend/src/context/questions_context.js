import axios from "axios";
import React, { useState, useContext, useReducer } from "react";

const QuestionContext = React.createContext();

const initialState = {
  posted_question: {},
  delete_question: {},
};

const QuestionProvider = ({ children }) => {
  const [questionState, setQuestionState] = useState(initialState);
  const [trigger_point, setTriggerPoint] = useState(false);

  const postQuestion = async ({ question }) => {
    const { data } = await axios.post(
      "https://mockup-quora-backend.herokuapp.com/api/questions",
      { question },
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );

    setQuestionState({
      ...questionState,
      posted_question: data,
    });
  };

  const editQuestion = async ({ id, question }) => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/questions/edit/" + id;
    const { data } = await axios.post(
      url,
      { question },
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );

    setQuestionState({
      ...questionState,
      posted_question: data,
    });
  };
  const deleteQuestion = async ({ id }) => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/questions/delete/" + id;
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });

    setQuestionState({
      ...questionState,
      delete_question: data,
    });
  };

  const question_refresh = () => {
    setQuestionState(initialState);
    setTriggerPoint(false);
  };
  return (
    <QuestionContext.Provider
      value={{
        questionState,
        setQuestionState,
        postQuestion,
        question_refresh,
        deleteQuestion,
        trigger_point,
        setTriggerPoint,
        editQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export { QuestionContext, QuestionProvider };
