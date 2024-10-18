const express = require("express")
const cors = require("cors")
const app = express()
const mongoose=require("mongoose")

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=>{
    console.log("Db success")
})
.catch(()=>{
    console.log("db failed")
})

const Activity=mongoose.model("Activity" ,{name:String} ,"activity")



app.get("/activityList",function(req,res){
   Activity.find().then((retdata)=>{
    res.send(retdata)
   })
})
app.post("/addactivity",function(req,res){
    var newactivity=req.body.newactivity 

    const newActivity = new Activity({
        name:newactivity
    })

    newActivity.save().then(()=>console.log("Saved Succesfully"))
    
})

app.delete("/deleteactivity/:id", function (req, res) {
    const activityId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return res.status(400).send({ error: "Invalid activity ID" });
      }
  
    Activity.findByIdAndDelete(activityId) 
      .then(() => {
        res.status(200).send({ message: "Activity deleted successfully" });
      })
      .catch((error) => {
        res.status(500).send({ error: "Failed to delete activity" });
      });
  });


app.listen(5000,function(){
    console.log("server started")
})