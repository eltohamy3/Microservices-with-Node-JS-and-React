const express = require("express");
const bodyParser = require("body-parser");

const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(
  cors(),
  // {
  //   origin: 'http://localhost:3000'
  // }
);

const commentsByPostId = {};
app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res, next) => {
  const postId = req.params.id;

  res.status(200).send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res, next) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  if (!commentsByPostId[postId]) {
    commentsByPostId[postId] = [];
  }
  commentsByPostId[postId].push({ id: commentId, content, status: "pending" });
  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    })
    .catch(console.log);
  res.status(201).send(commentsByPostId[postId]);
});
app.post("/events",async (req, res, next) => {
  console.log("Received Event", req.body.type);
  const event = req.body; 
  if (event.type==='CommentModerated'){
    const {postId , id , content  , status} = event.data; 
    const comments = commentsByPostId[postId]
    const comment = comments.find(comment =>comment.id ===id); 
    comment.status =status; 

    await axios.post('http://localhost:4005/events' , {
      type: 'CommentUpdated' , 
      data : {
        id , status,postId,content 
      }
    }).catch(console.log);


  }
  /**!SECTION
   * 
   * {
      type: 'CommentModerated' ,
      data:{
        id:data.id , 
        postId :data.postId , 
        status , 
        content : data.content
      }
    }
   */
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
