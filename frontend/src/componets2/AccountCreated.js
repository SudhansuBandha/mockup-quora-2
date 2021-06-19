import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import { useUserContext } from "../context/user_account_context";

function AccountCreated(props) {
  const { userState, added_user_nullify, loadProfile } = useUserContext();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageRender, setImageRender] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [submit, setSubmit] = useState(false);

  const send = (e) => {
    let image_check = false;
    let description_check = false;
    let image_file = new FormData();
    image_file.append("file", image);

    Axios.post(
      "https://mockup-quora-backend.herokuapp.com/api/profile/image",
      image_file,
      {
        headers: {
          Authorization: userState.loggedin_user.token,
        },
      }
    )
      .then((res) => {
        image_check = true;
      })
      .catch((err) => {
        console.log(err);
      });

    let description = textAreaValue;

    Axios.post(
      "https://mockup-quora-backend.herokuapp.com/api/profile",
      { description },
      {
        headers: {
          Authorization: userState.loggedin_user.token,
        },
      }
    )
      .then(() => {
        description_check = true;
      })
      .catch((err) => {
        console.log(err);
      });

    added_user_nullify();
    setSubmit(true);
  };
  const fileSelectedHandeler = (e) => {
    setImageRender(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (Object.keys(userState.added_user).length === 0) history.push(`/quora`);
  }, [userState.added_user]);

  useEffect(() => {
    if (submit) {
      loadProfile();

      history.push(`/quora`);
    }
  }, [submit]);
  return (
    <Container>
      {" "}
      <div className="account">
        <div className="details-box">
          <div className="inside-details">
            <p className="inside-color">
              Hi {userState.added_user.username} , your account has been
              created. Complete your profile
            </p>
            <div className="inside-second">
              <div className="add-image">
                <div>
                  {image ? (
                    <img src={imageRender} alt="" />
                  ) : (
                    <img src="/images/User.jpg" alt="" />
                  )}
                </div>

                <div style={{ marginTop: "10px" }}>
                  <input type="file" onChange={fileSelectedHandeler} />
                </div>
              </div>
              <div className="add-profile-description" style={{}}>
                <label>Add Profile Description:</label>
                <textarea
                  type="text"
                  className="middle-content-input"
                  placeholder="Enter Details for you profile"
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  rows={5}
                />
              </div>
              <div className="save-details">
                <Button type="" variant="success" className="sp" onClick={send}>
                  Submit Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .account {
    height: 500px;
    width: 850px;
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5%;

    @media screen and (max-width: 900px) {
      width: 700px;
      height: 520px;
    }

    @media screen and (max-width: 700px) {
      width: 600px;
      height: 480px;
    }
    @media screen and (max-width: 600px) {
      width: 450px;
    }
    @media screen and (max-width: 500px) {
      width: 350px;
      height: 500px;
    }
  }

  .details-box {
    border-style: outset;
    height: 100%;
    width: 100%;
  }

  .inside-details {
    padding: 2%;
  }
  .inside-color {
    border-left: 3px solid #ad0312;
    background-color: #dee3e0;
    font-size: 26px;
    padding-left: 5px;

    @media screen and (max-width: 700px) {
      font-size: 22px;
    }
  }
  .inside-second {
    font-size: 24px;
    margin-top: 3%;
    height: 150px;

    @media screen and (max-width: 700px) {
      font-size: 20px;
    }
  }
  .add-image {
    margin-left: 200px;

    @media screen and (max-width: 600px) {
      margin-left: 150px;
    }
    @media screen and (max-width: 500px) {
      margin-left: 50px;
    }

    img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 50%;
      /*box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);*/
    }
  }
  .add-profile-description {
    margin-top: 10px;
    font-size: 16px;
    @media screen and (max-width: 700px) {
      font-size: 14px;
    }
  }
  .middle-content-input {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: groove;
    width: 100%;
    overflow-wrap: break-word;
    background-color: #eee;
  }
  .middle-content-input:focus {
    outline: none;
  }
  .sp {
    margin-top: 10px;
    height: 40px;
  }
  .save-details {
    text-align: center;
  }
`;
export default AccountCreated;
