import React, { useEffect, useState } from "react";
//import { useSelector } from 'react-redux'
import Axios from "axios";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import FollowContent from "../../follow/FollowContent";
import { useUserContext } from "../../../context/user_account_context";
import { useProfileContext } from "../../../context/profile_context";
import styled from "styled-components";

function Follwers(props) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userState } = useUserContext();
  const { loadUsersProfile } = useProfileContext();
  //const userProfile = useSelector((state) => state.userProfile);
  //const { Profile } = userProfile;

  const fetchProfileFollowers = () => {
    const variables = {
      userTo: userState.profile._id,
      type: "user",
    };
    Axios.post(
      "https://mockup-quora-backend.herokuapp.com/api/following/followers",
      variables
    ).then((result) => {
      setFollowers(result.data);
      setLoading(false);
    });
  };

  const renderFollowers = followers.map((element, index) => {
    return (
      <div key={index}>
        {
          <FollowContent
            element={element}
            history={props.history}
            condition="followers"
          />
        }
      </div>
    );
  });

  useEffect(() => {
    fetchProfileFollowers();
    loadUsersProfile(props.profile_id);
  }, []);

  return loading ? (
    <div>
      <LoaderDots size="medium" />
    </div>
  ) : (
    <Container>
      {" "}
      <div className="profile-details-section">
        <div className="profile-details-section-header">
          <div className="profile-details-section-header-content">
            <h6>{followers.length} Followers</h6>
          </div>
        </div>
        {renderFollowers}
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
export default Follwers;
