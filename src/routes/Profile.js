import { authService, dbService } from "my_firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [updateName, setUpdateName] = useState(userObj.displayName);
  const history = useHistory();

  useEffect(() => {
    getMyTweets();
  }, []);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(tweets.docs.map((element) => element.data()));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setUpdateName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (updateName !== userObj.displayName) {
      await userObj.updateProfile({
        displayName: updateName,
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={updateName}
          type="text"
          placeholder="Display name"
          onChange={onChange}
        />
        <input type="submit" placeholder="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
