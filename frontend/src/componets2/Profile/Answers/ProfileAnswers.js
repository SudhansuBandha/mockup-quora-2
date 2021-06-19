import React, { useEffect, useState } from "react";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import IndividualAnswer from "./IndividualAnswer.js";
import { useUserContext } from "../../../context/user_account_context.js";
import { useAnswerContext } from "../../../context/answers_context.js";
import { useProfileContext } from "../../../context/profile_context";
import styled from "styled-components";
import axios from "axios";

function ProfileAnswers(props) {
  const { userState } = useUserContext();
  const { usersProfile, loadUsersProfile } = useProfileContext();
  const { answerTrigger } = useAnswerContext();
  const [Answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnswersUser = () => {
    let url =
      "https://mockup-quora-backend.herokuapp.com/api/answers/user_fetch/" +
      usersProfile.profile._id;

    axios.get(url).then((res) => {
      setAnswers(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAnswersUser();
    loadUsersProfile(props.profile_id);
  }, []);
  useEffect(() => {
    fetchAnswersUser();
  }, [answerTrigger]);
  return loading ? (
    <div>
      <LoaderDots size="medium" />
    </div>
  ) : (
    <Container>
      <div className="profile-details-section-header">
        <div className="profile-details-section-header-content">
          <h6>{Answers.length} Answers</h6>
        </div>
      </div>
      {Answers.map((answer) => {
        return (
          <div className="question-card" key={answer.id}>
            {
              <IndividualAnswer
                answer={answer}
                history={props.history}
                condition={false}
              />
            }
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  .profile-details-section-header {
    height: 40px;
    width: 94%;
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
export default ProfileAnswers;
