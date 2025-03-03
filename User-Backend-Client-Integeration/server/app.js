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

  const data = JSON.parse(fs.readFileSync("users.txt", "utf-8"));
  const { email, password, name } = req.body;

  data.push({ email, password, name, id: uuid() });

  fs.writeFileSync("users.txt", JSON.stringify(data));
  return res.json({
    message: "User added Successfully",
    data,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
