import axios from "axios";
import React, { useState, useContext } from "react";

const ProfileContext = React.createContext();

const initialState = {
  profile_id: "",
  profile: {},
};

const ProfileProvider = ({ children }) => {
  const [usersProfile, setUsersProfile] = useState(initialState);

  const loadUsersProfile = async (id) => {
    const { data } = await axios.get(
      "https://mockup-quora-backend.herokuapp.com/api/profile/" + id
    );
    setUsersProfile({
      ...usersProfile,
      profile: data,
      profile_id: id,
    });
  };
  const profile_refresh = () => {
    setUsersProfile(initialState);
  };
  return (
    <ProfileContext.Provider
      value={{
        usersProfile,
        setUsersProfile,
        loadUsersProfile,
        profile_refresh,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider };
