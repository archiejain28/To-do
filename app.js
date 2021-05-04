const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
var items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true})
const itemSchema = new mongoose.Schema({
    name: String
});

const item = mongoose.model("item",itemSchema)

const item1 = new item({
    name: "Food"
});

const item2 = new item({
    name: "Shoes"
});

const item3 = new item({
    name: "Market"
});

const arr = [item1, item2, item3]


app.get("/", function(req,res){
    var date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day = date.toLocaleDateString("en-US", options)

    item.find(function(err, founditem){
        if(founditem.length === 0){
            item.insertMany(arr, function(err){
                if(err){
                    console.log(err);
                }
               else{
                    console.log("Added")
                }
            })
            res.redirect("/")
        }
        else{
            res.render("list", {toDay: day, newItems: founditem});
        }
    });
});

app.get("/:path", function(req, res){
    console.log(req.params.path)
})

app.post("/", function(req, res){
//  if (req.body.reset === "reset"){
//  arr = [];
//  res.redirect("/")
// }
// else{
    var useritem = req.body.new

    const item4 = new item ({
        name: useritem
    })   
    item4.save();
    res.redirect("/")
// }
})

app.post("/delete", function(req, res){
    const deleteItem = req.body.check
    item.findByIdAndRemove(deleteItem, function(err){
        if(err){
            console.log(err)
        }

        else{
            console.log("Deleted Sucessfully")
        }
     })
    res.redirect("/")
})
app.listen(3000, function (){
    console.log("Server Started")
})