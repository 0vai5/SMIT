import express from "express";
import cors from "cors";
import Connect from "./dbConfig/DBConnect.js";
import Todo from "./model/todo.model.js";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
Connect();

app.post("/createTodo", async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
    });

    if (!todo) throw new Error("Error Creating TODO");

    await todo.save();

    return res.json({
      message: "Successfully! created Todo",
      todo,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get("/getTodo", async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos)
      return res.json({
        message: "No Todos Found",
      });

    return res.json({
      message: "Successfully found Todos",
      todos,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.post("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Todo.findByIdAndDelete(id);

    if (!response) throw new Error("Error Deleting Todo");

    return res.json({
      message: "Successfully Deleted Todo",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.put("/updateTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description } = req.body;

    const response = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!response)
      return res.json({
        message: "Error updating Todo",
      });

    res.json({
      message: "Successfully! Updated Todo",
      data: response,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${5000}`)
);
