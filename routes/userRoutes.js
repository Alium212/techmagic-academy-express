const express = require("express");
const fs = require('fs');
const path = require('path');
const router = express.Router();
const validateUser = require("../middlewares/userValidation");
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../JSON/usersMock.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/", validateUser, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstName,
        lastName,
        email,
        password,
        age,
        address,
        createdAt,
        tags,
    } = req.body;

    const newUser = {
        firstName,
        lastName,
        email,
        password,
        age,
        address,
        createdAt,
        tags,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

router.put("/:email", (req, res) => {
    const { email } = req.params;
    const { firstName, lastName, password, createdAt, address, tags, age } =
        req.body;

    let foundUser = users.find((user) => user.email === email);
    if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
    }

    const updateUser = {
        firstName: firstName || foundUser.firstName,
        lastName: lastName || foundUser.lastName,
        password: password || foundUser.password,
        createdAt: createdAt || foundUser.createdAt,
        address: address || foundUser.address,
        tags: tags || foundUser.tags,
        age: age || foundUser.age,
    };

    Object.assign(foundUser, updateUser);

    res.json({ message: "User updated", user: foundUser });
});

router.delete("/:email", (req, res) => {
    const { email } = req.params;
    const initialLength = users.length;

    users = users.filter((user) => user.email !== email);

    console.log(users.length, initialLength);
    if (users.length === initialLength) {
        return res.status(404).json({ error: "User not found" });
    }

    res.send("User deleted");
});

module.exports = router;
