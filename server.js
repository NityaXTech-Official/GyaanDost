import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: "User already exists!" });
  }

  const newUser = new User({ email, password });
  await newUser.save();
  res.json({ message: "Signup successful!" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ message: "Login successful!" });
  } else {
    res.json({ message: "Invalid email or password!" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
