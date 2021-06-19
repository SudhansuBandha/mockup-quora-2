import React, { useEffect, useState } from "react";
//import { useSelector } from 'react-redux'
import Axios from "axios";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import FollowContent from "../../follow/FollowContent";
import { useUserContext } from "../../../context/user_account_context";
import { useProfileContext } from "../../../context/profile_context";
import styled from "styled-components";

function Following(props) {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userState } = useUserContext();
  const { loadUsersProfile } = useProfileContext();
  //const userProfile = useSelector(state => state.userProfile)
  //const { Profile } = userProfile

  const fetchProfileFollowing = () => {
    const variables = {
      userId: userState.profile._id,
      type: "user",
    };
    Axios.post(
      "https://mockup-quora-backend.herokuapp.com/api/following",
      variables
    ).then((result) => {
      setFollowing(result.data);
      console.log(result.data);
      setLoading(false);
      //console.log(result.data)
    });
  };

  const renderFollowing = following.map((element, index) => {
    return (
      <div key={index}>
        {
          <FollowContent
            element={element}
            history={props.history}
            condition="following"
          />
        }
      </div>
    );
  });

  useEffect(() => {
    fetchProfileFollowing();
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
            <h6>{following.length} Following</h6>
          </div>
        </div>
        {renderFollowing}
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

export default Following;
