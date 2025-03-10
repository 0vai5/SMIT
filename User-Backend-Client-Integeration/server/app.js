import express from "express";
import fs from "fs";
import cors from "cors";
import { uuid } from "uuidv4";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getAllUsers", (req, res) => {
  if (fs.existsSync("users.txt")) {
    const data = JSON.parse(fs.readFileSync("users.txt", "utf-8"));
    return res.json({
      message: "Users fetched Successfully",
      data,
    });
  }

  res.send("No users found");
});

app.post("/createUser", (req, res) => {
  // agr pehle se user hai us email s to nhi add krna message bhej do warna add krdo

  if (!fs.existsSync("users.txt")) {
    fs.writeFileSync("users.txt", JSON.stringify([])); // Initialize as an array
  }

  let data = [];
  const fileContent = fs.readFileSync("users.txt", "utf-8");
  if (fileContent) {
    data = JSON.parse(fileContent);
  }

  const user = data.find((user) => user.email === req.body.email);

  if (user) {
    return res.json({
      message: "User already exists",
      data,
    });
  }

  data.push({ ...req.body, id: uuid() });

  fs.writeFileSync("users.txt", JSON.stringify(data));

  return res.json({
    message: "User added Successfully",
    data,
  });
});

app.post("/updateUser/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("users.txt", "utf-8"));
  const body = req.body;
  const { id } = req.params;

  const userUpdated = data.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        body,
      };
    }
  });

  fs.writeFileSync("users.txt", JSON.stringify(userUpdated));

  return res.json({
    message: "User updated Successfully",
    data,
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("users.txt", "utf-8"));
  const { id } = req.params;
  const userDeleted = data.filter((user) => user.id !== id);

  fs.writeFileSync("users.txt", JSON.stringify(userDeleted));

  return res.json({
    message: "User deleted Successfully",
    data: userDeleted,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
