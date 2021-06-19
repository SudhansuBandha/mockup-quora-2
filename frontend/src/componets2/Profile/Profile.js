import React, { useEffect, useState } from "react";
import { NavLink, Link, Switch, Route, useLocation } from "react-router-dom";
import ProfileQuestions from "./Questions/ProfileQuestions";
import ProfileAnswers from "./Answers/ProfileAnswers";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import FollowButton from "../follow/FollowButton";
import ProfileActivities from "./Activities/ProfileActivities";
import Following from "./Following/Following";
import Followers from "./Followers/Follwers";
import { useUserContext } from "../../context/user_account_context";
import { useProfileContext } from "../../context/profile_context";
import styled from "styled-components";
import { LoaderDots } from "@thumbtack/thumbprint-react";

function Profile(props) {
  var trash = <FontAwesomeIcon icon={faTrashAlt} />;
  const { userState, decode, loadProfile, loadingProfile } = useUserContext();
  const { usersProfile, loadUsersProfile } = useProfileContext();
  const [followers, setFollowers] = useState("");
  const [Profile, setProfile] = useState("");
  const location = useLocation();

  const id = location.pathname.split("/")[4];

  useEffect(() => {
    loadProfile();
    loadUsersProfile(id);
  }, [id]);

  if (loadingProfile)
    return (
      <Container>
        {" "}
        <div style={{ paddingTop: "40px" }}>
          <LoaderDots size="medium" />
        </div>
      </Container>
    );
  else {
    return (
      usersProfile.profile && (
        <Container>
          <div className="xyz">
            <div className="profile">
              <div className="profile-headline-2">
                <img src={usersProfile.profile.profilepic} alt="" />

                <div className="headline-details-2">
                  <div>
                    <p className="profile-name-2">
                      {usersProfile.profile.username}
                    </p>
                  </div>

                  <div className="details-description-2">
                    {usersProfile.profile.description}
                  </div>

                  <div className="headline-details-links-2">
                    <Link to="" className="headline-link-2">
                      Edit your profile
                    </Link>
                    <Link
                      to=""
                      data-tip
                      data-for="profileDeleteTip"
                      className="delete-profile-link-2 headline-link-2"
                    >
                      {trash}
                    </Link>
                    <ReactTooltip
                      id="profileDeleteTip"
                      place="top"
                      effect="solid"
                    >
                      Delete Your Profile
                    </ReactTooltip>
                  </div>
                </div>
              </div>

              <div className="profile-details">
                {userState.profile._id !== usersProfile.profile._id && (
                  <div
                    className="followers-count"
                    style={{ marginBottom: "20px", height: "31px" }}
                  >
                    {<FollowButton type="user" id={usersProfile.profile._id} />}
                  </div>
                )}

                <div className="profile-navbar">
                  <NavLink
                    exact
                    to={"/quora/profile/user/" + usersProfile.profile._id}
                    className="profile-navlinks navlinks-color"
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    exact
                    to={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/answers"
                    }
                    className=" profile-navlinks navlinks-color"
                  >
                    Answers
                  </NavLink>

                  <NavLink
                    exact
                    to={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/questions"
                    }
                    className="profile-navlinks navlinks-color"
                  >
                    Questions
                  </NavLink>

                  <NavLink
                    exact
                    to={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/followers"
                    }
                    className="profile-navlinks navlinks-color"
                  >
                    Followers
                  </NavLink>
                  <NavLink
                    exact
                    to={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/following"
                    }
                    className="profile-navlinks navlinks-color"
                  >
                    Following
                  </NavLink>
                </div>
              </div>
              <div>
                <Switch>
                  <Route
                    path={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/followers"
                    }
                    render={() => (
                      <Followers profile_id={usersProfile.profile._id} />
                    )}
                  />
                  <Route
                    path={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/following"
                    }
                    render={() => (
                      <Following profile_id={usersProfile.profile._id} />
                    )}
                  />
                  <Route
                    path={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/questions"
                    }
                    render={() => (
                      <ProfileQuestions profile_id={usersProfile.profile._id} />
                    )}
                  />
                  <Route
                    path={
                      "/quora/profile/user/" +
                      usersProfile.profile._id +
                      "/answers"
                    }
                    render={() => <ProfileAnswers profile_id={Profile._id} />}
                  />
                  <Route
                    path={"/quora/profile/user/" + usersProfile.profile._id}
                    render={() => (
                      <ProfileActivities
                        profile_id={usersProfile.profile._id}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </Container>
      )
    );
  }
}

const Container = styled.div`
  background-color: #dee3e0;

  .xyz {
    height: auto;
    width: 56vw;
    margin: 0 auto;
    padding-top: 3rem;
    @media screen and (min-width: 800px) and (max-width: 1150px) {
      width: 66vw;
    }
    @media screen and (max-width: 800px) {
      width: 80vw;
    }
    @media screen and (max-width: 450px) {
      width: 90vw;
    }
  }
  .profile {
    background-color: #fff;
    width: 100%;
    min-height: 650px;
    height: 100%;
    padding-top: 30px;
    padding-left: 40px;
    @media screen and (max-width: 450px) {
      padding-left: 20px;
    }
  }
  .profile-headline-2 {
    display: flex;
  }

  .profile-headline-2 > img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 450px) {
      height: 100px;
      width: 100px;
    }
  }
  .headline-details-2 {
    width: 70%;
    padding-top: 15px;
    padding-left: 15px;
    @media screen and (max-width: 450px) {
      padding-top: 0px;
    }
  }
  .headline-details-links-2 {
    display: flex;
    justify-content: space-between;
  }
  .profile-name-2 {
    font-size: 30px;
    font-weight: 645;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    height: 20px;
    @media screen and (max-width: 450px) {
      font-size: 24px;
    }
  }
  .details-description-2 {
    font-size: 16px;
    @media screen and(max-width:450px) {
      font-size: 14px;
    }
  }
  .delete-profile-link-2 {
    padding-right: 6px;
    padding-left: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .delete-profile-link-2:hover {
    cursor: pointer;
    background-color: #edeff2;
    border-radius: 50%;
  }
  .headline-link-2 {
    color: #989898;
    font-size: 14px;
    @media screen and (max-width: 450px) {
      font-size: 12px;
    }
  }
  .headline-link-2:hover {
    color: #989898;
  }
  .headline-link-edit-2 {
    margin-top: -5px;
    color: #989898;
    height: 24px;
    width: 30px;
  }
  .headline-link-edit-2:hover {
    color: #989898;
    cursor: pointer;
  }

  .profile-navbar {
    height: 42px;
    width: 50vw;
    border-top: solid 2px #e3e8e5;
    border-bottom: solid 2px #e3e8e5;
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    @media screen and (min-width: 800px) and (max-width: 1100px) {
      width: 60vw;
    }
    @media screen and (max-width: 800px) {
      width: 70vw;
    }
    @media screen and (max-width: 450px) {
      width: 80vw;
    }
  }
  .profile-navlinks {
    padding: 0 1.5vw 0 1.5vw;
    width: fit-content;
    padding-top: 5px;
    text-align: center;
  }
  .navlinks-color {
    color: #989898;
  }
  .active,
  .profile-navlinks:hover {
    background-color: #e3e8e5;
    color: #989898;
    cursor: pointer;
    text-decoration: none;
  }

  .profile-details-2 {
    padding-top: 15px;
    margin-top: 10px;
  }
  .followers-count-2 {
    font-size: 14px;
    color: #989898;
    padding-bottom: 1px;
    display: flex;
  }
`;

export default Profile;
