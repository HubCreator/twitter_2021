import { dbService, storageService } from "my_firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MakingTweet = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [fileString, setFileString] = useState(""); // transform img file to string

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
    if (tweet !== "") {
      const tweetObj = {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        fileStringUrl,
      };

      await dbService.collection("tweets").add(tweetObj);
      setTweet(""); // clear the input
      setFileString("");
    }
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
    setFileString("");
  };

  return (
    <>
      <form className="home-screen__form" onSubmit={onSubmit}>
        <div className="home-screen__form__first-row">
          <input
            className="home-screen__form__first-row__tweet"
            name={tweet}
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="what's on your mind?"
            maxLength={120}
          />
          <button
            className="home-screen__form__first-row__submit"
            type="submit"
            onClick={onSubmit}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="home-screen__form__second-row">
          <label for="choose-file" className="">
            <span>
              Add Photos<i className="fas fa-plus"></i>
            </span>
          </label>
        </div>
        <input
          id="choose-file"
          className="home-screen__form__choose-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ visibility: "hidden" }}
        />
        {fileString && (
          <div className="home-screen__form__imgPrev-contents">
            <img
              className="home-screen__form__imgPrev-contents__img"
              src={fileString}
              width="50px"
              height="50px"
            />
            <label>
              <span
                className="home-screen__form__imgPrev-contents__clear"
                onClick={onClearPhotoClicked}
              >
                Clear
                <FontAwesomeIcon id="clear" icon={faTimes} />
              </span>
            </label>
          </div>
        )}
      </form>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
        crossorigin="anonymous"
      ></link>
    </>
  );
};

export default MakingTweet;
