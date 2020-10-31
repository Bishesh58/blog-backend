const express = require('express');
const cors = require('cors');
const Post = require("./api/models/posts");


const app = express();
app.use(cors());
app.use(express.json())
const postData = new Post();




app.get ('/api/posts', (req, res) =>{

    res.status(200).send(postData.get());
});

app.get('/api/posts/:post_id', (req, res)=>{

    const postId = req.params.post_id;
    const foundPost = postData.getIndividualPost(postId);
    if(foundPost){
        res.status(200).send(foundPost)
    } else{
        res.status(404).send("Not found");
    }
});




app.listen(5000, console.log('listening to port 5000'));