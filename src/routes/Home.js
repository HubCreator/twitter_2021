import { dbService, storageService } from "my_firebase";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);
  const [fileString, setFileString] = useState(""); // transform img file to string

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

  // add data to db which I inputed data
  const onSubmit = async (event) => {
    event.preventDefault();
    let fileStringUrl = "";
    if (fileString !== "") {
      const fileStringRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileStringRef.putString(fileString, "data_url");
      fileStringUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileStringUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet(""); // clear the input
    setFileString("");
  };

  // if value changed update current value
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const targetFile = files[0]; // get the file
    const reader = new FileReader(); // create a reader
    reader.onloadend = (finishedEvent) => {
      // add event listener to the reader when it's finished loading the file
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileString(result);
    };
    reader.readAsDataURL(targetFile);
  };

  const onClearPhotoClicked = () => {
    setFileString();
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
      </form>
      {fileString && (
        <div>
          <img src={fileString} width="50px" height="50px" />
          <button onClick={onClearPhotoClicked}>Clear</button>
        </div>
      )}
      <div>
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
