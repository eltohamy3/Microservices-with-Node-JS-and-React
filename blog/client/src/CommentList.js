import React from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "pending") {
      content = "this comment awaiting moderation";
    } else if (comment.status === "rejected") {
      content = "this comment was rejected";
    } else {
      content = comment.content;
    }

    return (
      <li key={comment.id}>
        {content}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;