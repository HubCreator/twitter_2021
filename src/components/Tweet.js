import { dbService } from "my_firebase";
import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const check = window.confirm(
      "Are you sure you want to delete this tweet??"
    );
    if (check) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };
  return (
    <div>
      <h5>{tweetObj.text}</h5>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button>Edit Tweet</button>{" "}
        </>
      )}
    </div>
  );
};

export default Tweet;
