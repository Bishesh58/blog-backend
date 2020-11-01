const express = require('express');
const cors = require('cors');
var multer = require('multer');
const Post = require("./api/models/posts");
const postData = new Post();

const app = express();
app.use(cors());
app.use(express.json())
app.use('/assets', express.static('assets'))


var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets')
    },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})

const getExt =(mimeType)=>{
    switch(mimeType){
        case "image/png":
            return ".png";

        case "image/jpeg":
            return ".png";

        case "image/jpg":
            return ".jpg";
                      
    }
}

var assets = multer({storage: storage});


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

app.post('/api/posts', assets.single("post_image"), (req, res)=>{
    console.log(req.body);
    const newPost = {
        "id":`${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }
    postData.add(newPost);
    res.status(201).send(newPost);

})


app.listen(5000, console.log('listening to port 5000'));