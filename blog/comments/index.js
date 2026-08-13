

const express = require('express'); 
const bodyParser = require('body-parser'); 

const {randomBytes} = require('crypto'); 
const axios = require('axios');
const cors = require('cors'); 
const app = express();

app.use(cors(
  // {
  //   origin: 'http://localhost:3000'
  // }
))



const commentsByPostId ={};
app.use(bodyParser.json()); 

app.get('/posts/:id/comments' ,(req, res, next) =>{
  const postId = req.params.id ;
  
  res.status(200).send(commentsByPostId[postId]|| []); 
  

});

app.post('/posts/:id/comments' , async (req, res, next)=>{
  const postId = req.params.id ;
  const commentId = randomBytes(4).toString('hex'); 
  const {content} = req.body;

  if (!commentsByPostId[postId]){
    commentsByPostId[postId] = []
  }
  commentsByPostId[postId].push({id:commentId  , content}); 
  await axios.post('http://localhost:4005/events' , {
    type : 'CommentCreated' , 
    data: {
      id : commentId , 
      content , 
      postId
    }
  }).catch(console.log);
  res.status(201).send(commentsByPostId[postId]); 
})
app.post('/events' , (req , res ,next)=>{
  console.log("Received Event" , req.body.type); 
  res.send({});
})

app.listen(4001,()=>{
  console.log("Listening on port 4001"); 
})