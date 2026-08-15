

const express = require('express') ;


const bodyParser = require('body-parser'); 
const cors = require ('cors'); 

const app = express()
const axios = require('axios') ;  

app.use(bodyParser.json()); 

app.use(cors())

app.post('/events' ,async (req, res , next)=>{

  const event = req.body ;
  try{
    await axios.post('http://localhost:4000/events' ,event);  // for Posts
    await axios.post('http://localhost:4001/events' ,event);  // for comments
    await axios.post('http://localhost:4002/events' ,event);  // for query
    await axios.post('http://localhost:4003/events' ,event);  // for moderation

    res.send({
      status: 'Ok'
    });

  }catch(e){
    console.log(e.message); 
    res.send({
      status:'Error' 
      
    })
  }



})

app.listen(4005 , ()=>{
  console.log("Listening on port 4005")
})