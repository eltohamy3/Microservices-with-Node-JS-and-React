


const express = require('express'); 


const app = express() ;


app.use(express.json());


app.post('/posts' , (req , res , next)=>{

});

app.get('/posts' , (req, res , next)=>{

});

app.listen(3000 , ()=>{
  console.log("Listening on port 3000");
})