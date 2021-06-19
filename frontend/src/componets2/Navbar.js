import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faPlus,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/user_account_context";
import { useFormContext } from "../context/form_vailadtor_context";
import { useProfileContext } from "../context/profile_context";
import ReactTooltip from "react-tooltip";
import QuestionModal from "./modals/QuestionModal";
import SearchModal from "./modals/SearchModal";
import styled from "styled-components";

function NavBar(props) {
  const { userState, logout, decode } = useUserContext();
  const { usersProfile, setUsersProfile, profile_refresh } =
    useProfileContext();
  const { refresh } = useFormContext();

  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const info = decode();

  const Logout = () => {
    logout();
    refresh();
    setCheck(true);
  };

  const setId = () => {
    setUsersProfile({ ...usersProfile, profile_id: info.id });
    //setProfileTrigger(!profileTrigger);
  };
  var FS = <FontAwesomeIcon icon={faSearch} />;
  var FH = <FontAwesomeIcon icon={faHome} />;
  var FU = <FontAwesomeIcon icon={faUserCircle} size="2x" />;
  var FP = <FontAwesomeIcon icon={faPlus} />;

  useEffect(() => {
    if (check === true && sessionStorage.getItem("token") === null)
      history.push("/");
  }, [check]);

  return (
    <Header>
      {" "}
      <div className="nav-center">
        <div className="left">
          {" "}
          <div className="title">
            <h2>Quora</h2>
          </div>
          <Link
            to="/quora"
            className="red  home-tab-navbar"
            data-tip
            data-for="home"
            onClick={(e) => {
              profile_refresh();
            }}
          >
            <h3>{FH}</h3>
          </Link>
          <ReactTooltip id="home" place="bottom" type="light" effect="solid">
            Home
          </ReactTooltip>
        </div>
        <div className="right">
          <div
            className="search-btn"
            data-tip
            data-for="search"
            onClick={() => setSearchOpen(true)}
          >
            <h3>{FS}</h3>
          </div>
          <ReactTooltip id="search" place="bottom" type="light" effect="solid">
            Search
          </ReactTooltip>
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
          <div className="question" id="myBtn" style={{ marginLeft: "2vw" }}>
            <div className="link-blue" onClick={() => setisOpen(true)}>
              Add Question
            </div>
          </div>
          <div className="question-plus" onClick={() => setisOpen(true)}>
            <h3>{FP}</h3>
          </div>
          <QuestionModal open={isOpen} onClose={() => setisOpen(false)} />
          <Link
            to={"/quora/profile/user/" + userState.profile._id}
            className="red"
            onClick={setId}
          >
            <div className="profile_tab" data-tip data-for="profile">
              <img src={userState.profile.profilepic} />
            </div>
          </Link>
          <ReactTooltip id="profile" place="bottom" type="light" effect="solid">
            Profile
          </ReactTooltip>
          <div className="red link extra-link" onClick={Logout}>
            <div>Logout</div>
          </div>
        </div>
        {
          /*<Search>
          
            /* <div className="search-box" style={{ marginLeft: "10vw" }}>
            <input
              type="text"
              name=""
              className="search-txt"
              placeholder="Type to search"
              /*onChange={(e) => {
          search(e);
        }}*/
          //onFocus={() => setIsSearchOpen(true)}
        }

        {/*<SearchModal
            /*open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        text={text}
            >
          </Search>*/}
      </div>
    </Header>
  );
}
const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 1rem;
  height: 50px;

  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 450px) {
    height: 40px;
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.25rem;
    }
  }
  .nav-center {
    width: 65vw;
    margin: 0 auto;
    max-width: 1400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
      width: 100vw;
    }
  }
  .left,
  .right {
    display: flex;
  }
  .title {
    font-family: "Lucida Bright", monospace;
    color: #ad0312;
    padding-top: 5px;
  }
  .red {
    color: #ad0312;
  }
  .home-tab-navbar {
    margin-left: 1vw;
    margin-top: 5px;
    height: 40px;
    width: 40px;
    padding-left: 4px;
    padding-top: 4px;
  }
  .home-tab-navbar:hover {
    background-color: #ccc;
    color: #ad0312;
    border-radius: 2px;
  }
  .link {
    padding: 0px 10px;
  }
  .link:hover {
    cursor: pointer;
    background-color: #ccc;
    color: #ad0312;
    border-radius: 2px;
  }
  a:hover {
    text-decoration: none !important;
  }
  .link-blue {
    color: #b5e2f5;
  }

  .link-blue:hover {
    text-decoration: none;
    cursor: pointer;
    color: #fff;
  }
  .profile_tab {
    height: 42px;
    width: 42px;
    margin-left: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    margin-top: 5px;
    img {
      height: 40px;
      width: 40px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    }
    @media screen and (max-width: 450px) {
      height: 32px;
      width: 32px;
      img {
        height: 30px;
        width: 30px;
      }
    }
  }
  .profile_tab:hover {
    cursor: pointer;
    background-color: #ccc;
    color: #ad0312;
  }
  .extra-link {
    font-size: 1.25rem;
    padding: 10px;
    margin-left: 1vw;
    @media screen and (max-width: 450px) {
      font-size: 1rem;
    }
  }

  .active {
    border-bottom: 2px solid #ad0312;
    color: #ad0312 !important;
  }

  .question {
    height: 30px;
    background: #ad0312;
    border-radius: 40px;
    color: white;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    padding: 3px 10px 0px 10px;
    margin-top: 10px;
    font-size: 1rem;
    @media screen and (max-width: 450px) {
      display: none;
    }
  }
  .question-plus {
    height: 32px;
    width: 32px;
    background: #2f3640;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-left: 7px;
    padding-top: 10px;
    color: #ad0312;
    @media screen and (min-width: 450px) {
      display: none;
    }
  }
  .search-btn {
    color: #ad0312;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    padding-top: 10px;
    padding-left: 2px;

    @media screen and (max-width: 450px) {
      height: 32px;
      width: 32px;
    }
  }
  .search-btn:hover {
    cursor: pointer;
  }
`;

const Search = styled.div`
  .search-box {
    height: 40px;
    background: #2f3640;
    border-radius: 40px;
  }
  .search-btn {
    color: #ad0312;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-txt {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding-left: 10px;
    color: #e8da13;
    font-size: 16px;
    line-height: 40px;
    width: 300px;
  }
  .search-btn:hover {
    text-decoration: none;
    color: #ad0312;
    cursor: pointer;
  }
`;

export default NavBar;
