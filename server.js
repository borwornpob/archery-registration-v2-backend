const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const secret = "yoloooo";

app.post("/register", async (req, res) => {
    const { telnumber, password, name, surname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { telnumber, password: hashedPassword, name, surname },
        });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: "Telephone number already registered" });
    }
});

app.post("/login", async (req, res) => {
    const { telnumber, password } = req.body;
    const user = await prisma.user.findUnique({ where: { telnumber } });

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, secret);
    res.json({ token });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
