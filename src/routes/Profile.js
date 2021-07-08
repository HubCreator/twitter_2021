import { authService, dbService } from "my_firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [updateName, setUpdateName] = useState(userObj.displayName);
  const history = useHistory();

  useEffect(() => {
    getMyTweets();
  }, []);

  const onLogOutClick = () => {
    const check = window.confirm("Seriously?!?!?");
    if (check) {
      authService.signOut();
      history.push("/");
    }
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
    if (userObj.displayName !== updateName) {
      await userObj.updateProfile({
        displayName: updateName,
      });
      refreshUser();
    }
  };

  return (
    <div className="profile">
      <form className="profile__form" onSubmit={onSubmit}>
        <input
          className="profile__form__modify"
          name="name"
          value={updateName}
          type="text"
          placeholder="Display name"
          onChange={onChange}
        />
        <span className="profile__form__submit" onClick={onSubmit}>
          Update Profile
        </span>
      </form>
      <div className="profile__hr"></div>
      <span className="profile__log-out" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
