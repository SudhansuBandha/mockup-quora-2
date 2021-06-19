import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../context/user_account_context";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import HomeScreenAnswers from "./HomeScreenAnswers";
import HomeScreenQuestion from "./HomeScreenQuestions";
import styled from "styled-components";
import Axios from "axios";

function Test() {
  const history = useHistory();
  const { userState, decode, loadProfile } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [activites, setActivites] = useState([]);

  const fetchActivites = () => {
    Axios.post("https://mockup-quora-backend.herokuapp.com/api/activity/")
      .then((res) => {
        //console.log(res.data)
        setActivites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderActivites = activites.map((activity, index) => {
    if (activity.type === "answer") {
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

      return (
        <div key={index} className="posts">
          {<HomeScreenAnswers answer={answer} condition={true} />}
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
        user_id: activity.user._id,
        username: activity.user.username,
        date: activity.date,
      };
      return (
        <div key={index} className="posts">
          {<HomeScreenQuestion question={question} />}
        </div>
      );
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) history.push("/");
    else {
      loadProfile();
      fetchActivites();
    }
  }, []);

  return (
    <Container>
      {" "}
      <div className="home">
        <div className="wrapper">
          {" "}
          {loading ? (
            <div style={{ paddingTop: "40px", backgroundColor: "#fff" }}>
              <LoaderDots size="medium" />
            </div>
          ) : (
            <div>{renderActivites}</div>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #dee3e0;

  .home {
    height: auto;
    width: 50vw;
    margin: 0 auto;
    padding-top: 3rem;

    @media screen and (min-width: 800px) and (max-width: 1150px) {
      width: 60vw;
    }
    @media screen and (max-width: 800px) {
      width: 80vw;
    }
    @media screen and (max-width: 450px) {
      width: 90vw;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
  .posts {
    background-color: #ffffff;
    min-height: 125px;
    width: auto;
    margin: 0.6rem 0 0.6rem 0;
    padding: 20px;
    padding-top: 0px;
  }
  .posts .flex-container {
    display: flex;
    flex-wrap: wrap;
  }
  .posts .flex-container > div {
    margin: 5px;
  }
  /*.posts img {
    border-radius: 50%;
    max-width: 50px;
    max-height: 50px;
  }
  .second-flex {
    display: flex;
    flex-wrap: wrap;
  }
  .second-flex > p {
    padding: 0 2px 0 2px;
    margin-bottom: -5px;
  }
  .white {
    color: #989898;
  }
  .white-question {
    color: #989898;
  }
  .white-question:hover {
    color: #989898;
    text-decoration: underline;
    cursor: pointer;
  }*/
`;

export default Test;
