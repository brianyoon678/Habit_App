const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");

const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://brianyoon678:brianyoon678@cluster0.tmeaj.mongodb.net/").then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.log("Error Connecting to MongoDB", error);
  });

app.listen(PORT, () => {console.log("Server running on port 3000");});


const Habit = require("./models/habits")
// endpoints to create a habit in the backend
app.post("/habits", async(req,res) =>{
  try{
    const{title,color,repeatMode,reminder} = req.body;

    const newHabit = new Habit({
      title, color, repeatMode, reminder
    })

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch(error) {
    res.status(500).json({error:error.message})
  }
});




app.get("/habitslist",async(req,res) => {
  try{
    const allHabits = await Habit.find({});

    res.status(200).json(allHabbits);
  }catch(error){
    res.status(500).json({error:error.message});
  }
})

app.put("/habits/:habitId/completed/:day", async(req,res) => {
  try{
    const{habitId, day} = req.params;

    const habit = await Habit.findById(habitId);

    if(!habit){
      return res.status(404).json({error:"Habit not found"})
    }

    habit.completed[day] = true;

    await habit.save();

    res.status(200).json({message:"Habit Completion Status Updated"});
  } catch(error){
    console.log("Error", error);
    res.status(500).json({error:error.message});
  }
})