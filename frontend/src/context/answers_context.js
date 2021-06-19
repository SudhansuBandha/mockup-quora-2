import axios from "axios";
import React, { useState, useContext } from "react";

const AnswerContext = React.createContext();

const initialState = {
  posted_answer: {},
  deleted_answer: {},
};

const AnswerProvider = ({ children }) => {
  const [answerState, setAnswerState] = useState(initialState);
  const [answerTrigger, setAnswerTrigger] = useState(false);

  const postAnswer = async ({ id, answer }) => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/answers/post/" + id;

    const { data } = await axios.post(
      url,
      { answer },
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );

    setAnswerState({
      ...answerState,
      posted_answer: data,
    });
  };

  const editAnswer = async ({ id, answer }) => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/answers/edit/" + id;
    const { data } = await axios.post(
      url,
      { answer },
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );

    setAnswerState({
      ...answerState,
      posted_answer: data,
    });
  };

  const deleteAnswer = async ({ id }) => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/answers/delete/" + id;

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });

    setAnswerState({
      ...answerState,
      deleted_answer: data,
    });
  };

  const answer_refresh = () => {
    setAnswerState(initialState);
    setAnswerTrigger(false);
  };
  return (
    <AnswerContext.Provider
      value={{
        answerState,
        postAnswer,
        answer_refresh,
        deleteAnswer,
        editAnswer,
        answerTrigger,
        setAnswerTrigger,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswerContext = () => {
  return useContext(AnswerContext);
};

export { AnswerContext, AnswerProvider };
