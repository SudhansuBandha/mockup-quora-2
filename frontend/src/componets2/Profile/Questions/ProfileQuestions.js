import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import styled from "styled-components";
import IndividualQuestion from "./IndividualQuestion.js";
import { useUserContext } from "../../../context/user_account_context.js";
import { useQuestionContext } from "../../../context/questions_context.js";
import { useProfileContext } from "../../../context/profile_context";
import axios from "axios";

function ProfileQuestions(props) {
  const { userState } = useUserContext();
  const { usersProfile, loadUsersProfile } = useProfileContext();
  const { trigger_point } = useQuestionContext();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const location = useLocation();

  const fetchQuestions = () => {
    axios
      .get(
        "https://mockup-quora-backend.herokuapp.com/api/questions/fetch/" +
          usersProfile.profile._id
      )
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsersProfile(props.profile_id);
    fetchQuestions();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [trigger_point]);

  return loading ? (
    <div>
      <LoaderDots size="medium" />
    </div>
  ) : (
    <Container>
      <div className="profile-details-section-header">
        <div className="profile-details-section-header-content">
          <h6>{questions.length} Questions</h6>
        </div>
      </div>

      {questions.map((question) => {
        return (
          <div className="question-card" key={question._id}>
            <IndividualQuestion question={question} editorOpen={editorOpen} />
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  .profile-details-section-header {
    height: 40px;
    width: 95%;
    border-bottom: solid 2px #e3e8e5;
  }
  .profile-details-section-header-content {
    padding-top: 10px;
  }
  .question-card {
    padding-top: 20px;
    width: 95%;
    border-bottom: solid 2px #e3e8e5;
    background-color: #fff;
  }
`;
export default ProfileQuestions;
