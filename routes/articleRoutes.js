const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const studentsFilePath = path.join(__dirname, "../JSON/articleMock.json");
let articles = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));

router.get("/", (req, res) => {
    res.json(articles);
});

router.post("/", (req, res) => {
    const { name, description, type, tags } = req.body;

    if (!name || !description || !type || !tags) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newArticle = { name, description, type, tags };
    articles.push(newArticle);

    res.status(201).json(newArticle);
});

router.put("/:name", (req, res) => {
    const { name } = req.params;
    const { description, type, tags } = req.body;

    const foundArticleIndex = articles.findIndex(
        (article) => article.name === name
    );
    if (foundArticleIndex === -1) {
        return res.status(404).json({ error: "Article not found" });
    }

    const updatedArticle = {
        name,
        description: description || articles[foundArticleIndex].description,
        type: type || articles[foundArticleIndex].type,
        tags: tags || articles[foundArticleIndex].tags,
    };

    articles[foundArticleIndex] = updatedArticle;
    res.json({ message: "Article updated", article: updatedArticle });
});

module.exports = router;
