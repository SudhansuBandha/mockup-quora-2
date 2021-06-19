import axios from "axios";
import React, { useState, useContext } from "react";

const CommentsContext = React.createContext();

const initialState = {
  posted_comment: {},
  deleted_comment: {},
};

const CommentsProvider = ({ children }) => {
  const [commentState, setCommentState] = useState(initialState);
  const [commentTrigger, setCommentTrigger] = useState(false);

  const postComment = async ({ id, comment }) => {
    const url = "https://mockup-quora-backend.herokuapp.com/api/comment/" + id;
    const { data } = await axios.post(
      url,
      { comment },
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );

    setCommentState({
      ...commentState,
      posted_comment: data,
    });
  };

  const deleteComment = async ({ id }) => {
    const url = "https://mockup-quora-backend.herokuapp.com/api/comment/" + id;

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });

    setCommentState({
      ...commentState,
      deleted_comment: data,
    });
  };

  const comment_refresh = () => {
    setCommentState(initialState);
    setCommentTrigger(false);
  };
  return (
    <CommentsContext.Provider
      value={{
        commentState,
        postComment,
        comment_refresh,
        deleteComment,
        commentTrigger,
        setCommentTrigger,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentsContext);
};

export { CommentsContext, CommentsProvider };
