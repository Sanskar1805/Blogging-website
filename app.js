const bodyParser = require("body-parser");
const express  = require("express");
const app = express();
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true});
const homeStartingContent ="I'm still upset that Tie Domi didn't name his child Tyson. To Catch A Predator would have been a great name for a Steve Irwin show. Mintslavicia. Are there Out-of-Stock photos? Gafuffle. We say we are walking the dog, but the dog always leads. A tagline for an airline: Take the High Road";
const aboutContent = "To Catch A Predator would have been a great name for a Steve Irwin show. Mintslavicia. I have a moral code, but I haven't figured out how to read it yet. Logan Ipsum will loop at some point. If the word kerning is kerned poorly, it kind of looks like learning - which is appropriate because both are important. Rumour has it targeted online advertising was developed because the internet was upset that you could read it but it couldn't read you. Trepidelicious.";
const contactContent="I have never known a Jack that was in good enough shape to name bodybuilding after him. We say we are walking the dog, but the dog always leads. A tagline for a special highway that is easy to navigate while under the influence of drugs: Take the High Road. If Fantasy Hockey actually lived up to its name, every team would have Henrik Lundqvist and Joffrey Lupul on it. A tagline for an airline: Take the High Road.";
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extendend:true}));
app.use(express.static("public"));

const postSchema = {
    title : String,
    des : String
};

const Post = mongoose.model("Post" , postSchema);

app.get("/" , function(req,res){
    Post.find({},function(err,posts){
        res.render("home",{des : homeStartingContent,posts:posts});
    });
});

app.get("/about",function(req,res){
    res.render("about",{des:aboutContent});
});
app.get("/contact",function(req,res){
    res.render("contact",{des:contactContent});
});

app.get("/compose",function(req,res){
    res.render("compose");
})

app.get("/posts/:element",function(req,res){
    const postId = _.lowerCase(req.params.element);
    Post.find({},function(err,posts){
        posts.forEach(function(post){
            const Id =_.lowerCase(post._id);
            if(postId === Id){
                res.render("post",{posts:posts , title : post.title});
            }
        });
    });
    
});

app.post("/compose",function(req,res){
    const post= new Post({
        title : req.body.postTitle,
        des : req.body.postBody
    });
    post.save();
    res.redirect("/");
})

app.listen(3000,function(req,res){
    console.log("server started at port 3000");
});
