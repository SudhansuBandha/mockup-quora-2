import { LoaderDots } from "@thumbtack/thumbprint-react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import IndividualAnswer from "../Answers/IndividualAnswer";
import IndividualQuestion from "../Questions/IndividualQuestion";
import styled from "styled-components";

function ProfileActivities(props) {
  //console.log(props);
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);

  //const userProfile = useSelector((state) => state.userProfile);
  //const { Profile } = userProfile

  useEffect(() => {
    fetchActivites();
  });

  const fetchActivites = () => {
    Axios.post(
      "https://mockup-quora-backend.herokuapp.com/api/activity/" +
        props.profile_id
    )
      .then((res) => {
        setActivites(res.data);
        setLoading(false);
        //Axios.get('/api/activity/date/'+res.data[0].date)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderActivites = activites.map((activity, index) => {
    if (activity.type === "answer") {
      //console.log(activity)
      const answer = {
        id: activity._id,
        answer: activity.answer,
        question: activity.question.question,
        question_id: activity.question._id,
        user: activity.user.username,
        downvotes: [],
        upvotes: [],
        user_id: activity.user._id,
        date: activity.date,
        description: activity.user.description,
        profilepic: activity.user.profilepic,
      };
      //console.log(answer)
      return (
        <div className="question-card" key={index}>
          {
            <IndividualAnswer
              answer={answer}
              history={props.history}
              condition={true}
            />
          }
        </div>
      );
    }

    if (activity.type === "question") {
      const question = {
        _id: activity._id,
        question: activity.question,
        type: activity.type,
        followers: [],
        following: [],
        user: activity.user._id,
        date: activity.date,
      };
      return (
        <div key={index} className="question-card">
          {<IndividualQuestion question={question} history={props.history} />}
        </div>
      );
    }
  });

  return (
    <Container>
      {" "}
      <div className="profile-details-section">
        <div className="profile-details-section-header">
          <div className="profile-details-section-header-content">
            <h6> Recent Activites</h6>
          </div>
        </div>
        {renderActivites}
      </div>
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

export default ProfileActivities;
