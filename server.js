// server.js
// where your node app starts

// init project
const cors = require ('cors')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const express = require('express')
const app = express()
const qwant = require("qwant-api");


const searchTerm = require ('./model/searchTerm');

app.use(bodyParser.json());
app.use(cors());

//connection
mongoose.connect("mongodb://ammar:4444@ds033066.mlab.com:33066/searchterm").then(
  () => { console.log("connected") },
  err => { console.log(err) }
);
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.get("/", (request, response) => 
  {
  response.sendFile(__dirname + '/views/index.html')
  });

app.get('/api/recentsearch',function(req,res,next)
{
  searchTerm.find({},function (err,data)
  {
    res.json(data);
  });
});

app.get('/api/imagesearch/:searchVal*',function (req,res,next)
      {
        var searchVal = req.params.searchVal;
        var offset = req.query.offset;
        var data = new searchTerm({
          searchVal,
          searchDate : new Date()
        });
       data.save(function(err){
       if(err)
       {
         return res.send("Error save to database");
       }
       
       });
        
    
 
qwant.search("images", { query: searchVal, count: 10, offset : offset,language: "english" }, function(err, data){
    var mydata=[];
    var offset = req.query.offset;
  
  for(var i=0;i<10;i++)
  {
    mydata.push({
    url :data.data.result.items[i].url,
    snippet :data.data.result.items[i].title,
    thumbnail :data.data.result.items[i].thumbnail,
    context:data.data.result.items[i].media
    
      
    })
  }
   res.json(mydata);
});
   

      });
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
