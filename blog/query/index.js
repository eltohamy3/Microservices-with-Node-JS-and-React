const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const postsWithComments = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(postsWithComments);
});

app.post("/events", (req, res) => {
  const event = req.body;

  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    postsWithComments[id] = {
      id,
      title,
      comments: [],
    };
  } else if (event.type === "CommentCreated") {
    const { postId, id, content, status } = event.data; // ← fixed here
    if (postsWithComments[postId]) {
      postsWithComments[postId].comments.push({ id, content, status });
    }
  } else if (event.type === "CommentUpdated") {
    const { postId, id, content, status } = event.data;
    const post = postsWithComments[postId];

    if (post) {
      const commentIndex = post.comments.findIndex((c) => c.id === id);
      if (commentIndex !== -1) {
        post.comments[commentIndex] = { id, content, status }; // ← fixed
      }
    }
  }

  res.send("Ok");
});

app.listen(4002, () => {
  console.log("listening on port 4002.");
});
