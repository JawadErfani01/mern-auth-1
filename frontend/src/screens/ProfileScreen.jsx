import React from "react";
import MyProfile from "../components/Profile/MyProfile";
import MyPost from "../components/Profile/MyPost";

const ProfileScreen = () => {
  return (
    <div className="max-w-4xl p-5 mx-auto ">
      <MyProfile />
      <MyPost />
    </div>
  );
};

export default ProfileScreen;
