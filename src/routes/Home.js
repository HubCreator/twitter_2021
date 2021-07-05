import { dbService } from "my_firebase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);

  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweetList(tweetArray);
        console.log(tweetArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="what the hack?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweetList.map((tweet) => (
          <div key={tweet.id}>
            <h5>{tweet.text}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
