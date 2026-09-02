


const express = require('express'); 

const {randomBytes} = require('crypto') ; // we will use it to create a new ID for every post 

const cors = require('cors');
const bodyParser = require('body-parser');
const posts = {}; 
const app = express() ;

const axios = require('axios'); 
// app.use(cors())
app.use(cors(
  {
    origin: 'http://localhost:3000'
  }
))
app.use(bodyParser.json());
app.post('/posts/create' ,async (req , res , next)=>{
  const id = randomBytes(4).toString('hex'); // generate a random id and convert it to hex format
  const {title} = req.body;
  posts[id]={
    id,title
  };
   await axios.post('http://event-bus-srv:4005/events' , {
    type : 'PostCreated' , 
    data:posts[id]
   }).catch(console.log); 
  res.status(201).send(posts[id]);
 
});  

app.get('/posts' , (req, res , next)=>{
  res.send(posts);

});
app.post('/events' , (req , res ,next)=>{
  console.log("Received Event" , req.body.type); 
  res.send({});
})
app.listen(4000 , ()=>{
  console.log("v30");
  console.log("Listening on port 4000 ");
})