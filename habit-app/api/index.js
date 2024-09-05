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


// Starts the express server with 3000 as default
app.listen(PORT, () => {console.log("Server running on port 3000");});

// the datatypes of the habit details
const Habit = require("./models/habits")

// endpoints to create a habit in the backend
app.post("/habits", async(req,res) =>{
  try{
    const{title,color,repeatMode,reminder} = req.body;

    const newHabit = new Habit({title, color, repeatMode, reminder});

    // saves habit into the database using .save() from mongo database thing
    const savedHabit = await newHabit.save();

    res.status(200).json(savedHabit);
    
  } catch(error) {
    res.status(500).json({error:error.message})
  }
});




app.get("/habitslist",async(req,res) => {
  try{
    const allHabits = await Habit.find({});

    res.status(200).json(allHabits);
  }catch(error){
    res.status(500).json({error:error.message});
  }
});

app.put("/habits/:habitId/completed", async (req, res) => {
  const habitId = req.params.habitId;
  const updatedCompletion = req.body.completed; // The updated completion object

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      { completed: updatedCompletion },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    return res.status(200).json(updatedHabit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/habits/:habitId",async(req,res) => {
  try{
    const {habitId}=req.params;

    await Habit.findByIdAndDelete(habitId);

    res.status(200).json({message:"Habit Deleted Successfully"});
    
  } catch(error){
    res.status(500).json({error:"Unable to delete the habit"});
  }
})