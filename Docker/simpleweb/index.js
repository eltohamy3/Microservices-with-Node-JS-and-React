

const express = require('express');

const bodyParser = require('body-parser'); 
const app = express(); 

app.use(bodyParser.json()); 


app.get('/' , (req, res, next)=>{
  res.send('Hi there'); 
})

app.listen(8000 , ()=>{
  console.log('Listening on port 8000');
}); 
