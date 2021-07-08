import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "my_firebase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false); // whether it's edit mode or not
  const [updateTweet, setUpdateTweet] = useState(tweetObj.text); // modify the value of the input

  const onDeleteClick = async () => {
    const check = window.confirm(
      "Are you sure you want to delete this tweet??"
    );
    if (check) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.fileStringUrl).delete();
    }
  };

  const toggleEditing = () => setEdit((prev) => !prev); // toggle function especially about edit val

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(tweetObj, updateTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: updateTweet,
    });
    setEdit(false);
  };

  const editTweet = (event) => {
    const {
      target: { value },
    } = event;
    setUpdateTweet(value);
  };

  return (
    <div>
      {edit ? (
        <form className="home-screen__modify" onSubmit={onSubmit}>
          <input
            id="modify-tweet"
            type="text"
            placeholder="Edit your tweet"
            value={updateTweet}
            required
            onChange={editTweet}
          />
          {/* <input id="modify-submit" type="submit" value="Update Tweet" />
          <button id="modify-cancel" onClick={toggleEditing}>
            Cancel
          </button> */}
          <span id="modify-submit" onClick={onSubmit}>
            Update Tweet
          </span>
          <span id="modify-cancel" onClick={toggleEditing}>
            Cancel
          </span>
        </form>
      ) : (
        <>
          <h5 className="home-screen__tweet-list__text">{tweetObj.text}</h5>

          <div className="home-screen__tweet-list__contents">
            {tweetObj.fileStringUrl && (
              <img
                className="home-screen__tweet-list__contents__img"
                src={tweetObj.fileStringUrl}
                alt="img"
                width="50px"
                height="50px"
              />
            )}
            {isOwner && (
              <div className="home-screen__tweet-list__contents__tools">
                <FontAwesomeIcon
                  id="delete"
                  icon={faTrash}
                  onClick={onDeleteClick}
                />
                <FontAwesomeIcon
                  id="modify"
                  icon={faPencilAlt}
                  onClick={toggleEditing}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tweet;
