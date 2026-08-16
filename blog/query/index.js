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


const handleEvent=(type , data)=>{

 if (type === "PostCreated") {
    const { id, title } = data;
    postsWithComments[id] = {
      id,
      title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { postId, id, content, status } = data; // ← fixed here
    if (postsWithComments[postId]) {
      postsWithComments[postId].comments.push({ id, content, status });
    }
  } else if (type === "CommentUpdated") {
    const { postId, id, content, status } = data;
    const post = postsWithComments[postId];

    if (post) {
      const commentIndex = post.comments.findIndex((c) => c.id === id);
      if (commentIndex !== -1) {
        post.comments[commentIndex] = { id, content, status }; // ← fixed
      }
    }
  }


}
app.post("/events", (req, res) => {

  const {type , data} = req.body; 
  handleEvent(type,data); 
  res.send("Ok");
});

app.listen(4002,async () => {
  console.log("listening on port 4002.");
  try{
    const res = await axios.get('http://localhost:4005/events' ) ;
    for (let event of res.data){
      console.log("processing event : " , event.type); 
        handleEvent(event.type,event.data); 

    }

  }catch(e){
    console.log(e.message) ;
  }
});
