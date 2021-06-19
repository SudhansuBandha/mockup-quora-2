import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import ReactRoundedImage from "react-rounded-image";
import styled from "styled-components";
import { useProfileContext } from "../../context/profile_context";
import axios from "axios";

export default function QuestionModal({ open, onClose }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { loadUsersProfile } = useProfileContext();
  const close = () => {
    onClose();
    setTextAreaValue("");
    setSearchData([]);
  };
  const fetchData = async () => {
    const url =
      "https://mockup-quora-backend.herokuapp.com/api/search/" + textAreaValue;
    const { data } = await axios.get(url);

    setSearchData(data);
  };

  useEffect(() => {
    if (textAreaValue.length > 0) fetchData();
    if (textAreaValue.length === 0) setSearchData([]);
  }, [textAreaValue]);

  if (!open) return null;

  return ReactDom.createPortal(
    <Container>
      <div className="overlay-modal" onClick={close} />
      <div className="style-modal">
        <div className="top">
          <div className="modal-title">
            <h3>Search</h3>
          </div>
        </div>

        <div className="middle">
          <div className="middle-content">
            <textarea
              type="text"
              className="middle-content-input"
              placeholder="Type your text for search"
              onChange={(e) => setTextAreaValue(e.target.value)}
              rows={1}
            />
            <div className="search-result">
              {searchData.map((single) => (
                <div className="search-modal-content" key={single.id}>
                  <div className="search-modal-textarea">
                    {single.type === "question" ? (
                      <Link to={"/" + single.id} className="search-links">
                        <div className="search-modal-text">
                          <strong>
                            {single.question.substring(0, textAreaValue.length)}
                          </strong>
                          {single.question.substring(textAreaValue.length)}
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to={"/quora/profile/user/" + single.id}
                        className="search-links"
                        onClick={close}
                      >
                        <div className="search-modal-text">
                          <ReactRoundedImage
                            image={single.image}
                            imageWidth="36"
                            imageHeight="36"
                            roundedSize="0"
                          />
                          <p
                            className="search-modal-profile-text"
                            style={{ marginTop: "5px" }}
                          >
                            Profile :
                          </p>
                          <p style={{ marginTop: "5px" }}>
                            <strong>
                              {single.username.substring(
                                0,
                                textAreaValue.length
                              )}
                            </strong>
                            {single.username.substring(textAreaValue.length)}
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-button" onClick={close}>
            Cancel Search
          </div>
        </div>
      </div>
    </Container>,
    document.getElementById("portal")
  );
}

const Container = styled.div`
  .style-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: gainsboro;
    box-sizing: border-box;
    z-index: 1000;
    height: auto;
    width: 500px;
    border-radius: 10px;

    @media screen and (max-width: 600px) {
      width: 80vw;
    }
  }
  .overlay-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(39, 37, 37, 0.7);
    z-index: 1000;
  }
  .top {
    height: 54px;
    display: flex;
    justify-content: center;
    border-bottom: #bdbebf 2px solid;
  }
  .middle {
    height: auto;
    background-color: #fff;
  }
  .middle-content {
    padding: 20px;
    font-size: 17px;
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
  .search-result {
    width: 100%;
    min-height: 300px;
    height: auto;
    overflow-y: auto;
  }
  .search-modal-content {
    display: flex;
    border-bottom: 2px solid #b3adad;
    background-color: #fff;
  }
  .search-modal-content:hover {
    cursor: pointer;
  }
  .search-modal-textarea {
    min-height: 40px;
    width: 100%;
    display: block;
    word-wrap: break-word;
  }
  .search-links {
    color: black;
  }
  .search-links:hover {
    text-decoration: none;
  }
  .search-modal-text {
    padding-left: 13px;
    padding-top: 5px;
    font-size: 16px;
    width: 303px;
    display: flex;
  }
  .search-modal-profile-text {
    padding-left: 5px;
    padding-right: 8px;
  }
  .modal-title {
    margin-top: 10px;

    @media screen and (max-width: 420px) {
      h3 {
        font-size: 1.5rem;
      }
    }
  }

  .bottom {
    height: 54px;
    display: flex;
    border-top: #bdbebf 2px solid;
    justify-content: center;
    align-items: center;
  }

  .bottom-button {
    background: #ad0707;
    height: 25px;
    width: auto;
    border-radius: 40px;
    padding: 0 10px 0 10px;
  }
  .bottom-button:hover {
    color: #fff;
    background-color: #ad0312;
    cursor: pointer;
  }
`;
