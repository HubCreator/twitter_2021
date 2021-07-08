import { dbService, storageService } from "my_firebase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import MakingTweet from "./MakingTweet";

const Home = ({ userObj }) => {
  const [tweetList, setTweetList] = useState([]);

  // componentDidMount
  useEffect(() => {
    dbService
      .collection("tweets") // from
      .orderBy("createdAt", "desc") // order by
      .onSnapshot((snapshot) => {
        // when something happen in your db it notifies
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id, // add doc.id
          ...doc.data(),
        }));
        setTweetList(tweetArray); // update tweetList
      });
  }, []);

  return (
    <div className="home-screen">
      <MakingTweet userObj={userObj} />

      <div className="home-screen__tweet-list">
        {tweetList.map((element) => (
          <Tweet
            key={element.id}
            tweetObj={element}
            isOwner={element.creatorId === userObj.uid} // it returns true or false
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
