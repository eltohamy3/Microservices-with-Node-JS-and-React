


const express = require('express'); 
const bodyParser = require('body-parser'); 

const {randomBytes} = require('crypto'); 

const cors = require('cors'); 
const app = express();

app.use(cors(
  {
    origin: 'http://localhost:3000/'
  }
))

const commentsByPostId ={};
app.use(bodyParser.json()); 

app.get('/posts/:id/comments' ,(req, res, next) =>{
  const postId = req.params.id ;
  
  res.status(200).send(commentsByPostId[postId]|| []); 
  

});

app.post('/posts/:id/comments' , (req, res, next)=>{
  const postId = req.params.id ;
  const commentId = randomBytes(4).toString('hex'); 
  const {content} = req.body;

  if (!commentsByPostId[postId]){
    commentsByPostId[postId] = []
  }
  commentsByPostId[postId].push({id:commentId  , content}); 
  res.status(201).send(commentsByPostId[postId]); 
})

app.listen(4001,()=>{
  console.log("Listening on port 4001"); 
})