const express = require('express');
const Post = require("./api/models/posts");


const app = express();
const postData = new Post();



app.get ('/api/posts', (req, res) =>{
    res.status(200).send(postData.get());
})





app.listen(5000, console.log('listening to port 5000'));