

const express = require('express'); 


const bodyParser = require('body-parser');

const axios = require('axios')

const cors = require('cors'); 
const app = express(); 
const postsWithComments = {}; 
app.use(bodyParser.json()); 

app.use(cors()); 

app.get('/posts' , (req ,res, next)=>{
  res.send(postsWithComments); 
});

app.post('/events' , (req ,res , next)=>{
    const event  = req.body; 

    if (event.type =='PostCreated'){
      const id = event.data.id; 
      postsWithComments[id] = {
        id , 
        title:event.data.title , 
        comments :[]
      }
    }else if (event.type =='CommentCreated')
    {
      const postId = event.data.postId; 
      if (postsWithComments[postId]){
        postsWithComments[postId].comments.push({
          id : event.data.id , 
          content:event.data.content
        })
      }
    }
    res.send("Ok"); 
})
app.listen(4002 , ()=>{
  console.log("listening on port 4002.")
  
})





