const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", async function (req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/users", async function (req, res) {
  const newUser = req.body;

  try {
    const createdUser = await prisma.user.create({ data: newUser });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Error inserting user" });
  }
});

app.delete("/users/:id", async function (req, res) {
  const userId = req.params.id;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId.toString(),
      },
    });

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.listen(() => console.log(`Server is running on Vercel`));
