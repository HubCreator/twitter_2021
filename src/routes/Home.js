import { dbService } from "my_firebase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);

  // componentDidMount
  useEffect(() => {
    dbService
      .collection("tweets") // from
      .orderBy("createdAt", "desc") // order by
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id, // add doc.id
          ...doc.data(),
        }));
        setTweetList(tweetArray); // update tweetList
      });
  }, []);

  // add data to db which I inputed data
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet(""); // clear the input
  };

  // if value changed update current value
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
          name={tweet}
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="what the hack?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweetList.map((element) => (
          <Tweet
            key={element.id}
            tweetObj={element}
            isOwner={element.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
