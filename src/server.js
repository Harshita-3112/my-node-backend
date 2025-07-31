const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoSchema = require("./models/todoSchema");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const mongoURI =
  "mongodb+srv://harshita:1234567890@cluster0.8jd7e4q.mongodb.net/crud-example";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.post("/create", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    console.log("create api", title, description, completed);

    const newTodoSchema = new todoSchema({ title, description, completed });
    await newTodoSchema.save();
    res
      .status(201)
      .send({ message: "Item created successfully", newTodoSchema });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/getAll", async (req, res) => {
  // res.send("Hello from your first Node.js API!");
  try {
    const response = await todoSchema.find();
    res.send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/getAll/:tourid", async (req, res) => {
  try {
    const { tourid } = req.params;
    console.log("tourid here", tourid);

    const response = await todoSchema.findById(tourid);
    res.send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
