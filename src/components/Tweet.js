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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Edit your tweet"
            value={updateTweet}
            required
            onChange={editTweet}
          />
          <input type="submit" value="Update Tweet" />
          <button onClick={toggleEditing}>Cancel</button>
        </form>
      ) : (
        <>
          <h5>{tweetObj.text}</h5>
          {tweetObj.fileStringUrl && (
            <img
              src={tweetObj.fileStringUrl}
              alt="img"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
