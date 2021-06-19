import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { listQuestions } from '../actions/questionActions'
import { LoaderDots } from "@thumbtack/thumbprint-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faWifi,
  faShare,
  faTrashAlt,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
//import EditModal from './modals/EditModal'
//import { editQuestion } from '../actions/questionActions'
//import DeleteQuestion from './modals/DeleteQuestion'
import TextEditor from "../editor/Editor";
//import { deleteProfile } from '../actions/userActions'
import { render } from "react-dom";
import Axios from "axios";
import IndividualAnswer from "../Profile/Answers/IndividualAnswer";
import IndividualQuestion from "../Profile/Questions/IndividualQuestion";

import "./HomeScreen.css";
import HomeScreenAnswers from "./HomeScreenAnswers";
import HomeScreenQuestion from "./HomeScreenQuestions";
import { useUserContext } from "../../context/user_account_context";
import styled from "styled-components";
function HomeScreen(props) {
  const { userState, decode } = useUserContext();
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    decode();
    //fetchActivites();
    //Axios.get('/').then((res)=>{console.log(res.data)})
  }, []);

  /*const fetchActivites = () => {
    Axios.post("/api/activity/")
      .then((res) => {
        //console.log(res.data)
        setActivites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadMoreItems = () => {
    console.log("CurrentPage", page);
    setPage(page + 1);
  };
  let count = 0;

  const renderActivites = activites.map((activity, index) => {
    count = count + 1;
    console.log(count);
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
        <div key={index} className="posts">
          {
            <HomeScreenAnswers
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
        user_id: activity.user._id,
        username: activity.user.username,
        date: activity.date,
      };
      return (
        <div key={index} className="posts">
          {<HomeScreenQuestion question={question} history={props.history} />}
        </div>
      );
    }
  });*/
  return (
    <Container>
      <div className="homepage">
        <div style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}>
          <LoaderDots size="medium" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
background-color: #dee3e0;

.homepage {
  height: 500px;
  width: 50vw;
  margin: 0 auto;
  padding-top: 6rem;

  @media screen and (max-width: 800px) {
    width: 100vw;
  }
}
.loaders {
  margin-left: 300px;
}

.posts {
  background-color: #ffffff;
  min-height: 125px;
  width: 700px;
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
}
`;

export default HomeScreen;
