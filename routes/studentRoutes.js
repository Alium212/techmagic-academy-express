const express = require("express");
const fs = require('fs');
const path = require('path');
const router = express.Router();

const studentsFilePath = path.join(__dirname, '../JSON/studentsMock.json');
let students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));

router.get("/", (req, res) => {
    res.json(students);
});

router.get("/statistics", (req, res) => {
    const studentStatistics = students.map((student) => {
        const averageScore =
            student.scores.reduce((total, score) => total + score.score, 0) /
            student.scores.length;
        return { name: student.name, averageScore };
    });

    res.json(studentStatistics);
});

router.get("/worst-homework-score", (req, res) => {
    let worstHomeworkStudent = null;
    let worstHomeworkScore = Number.MAX_VALUE;

    students.forEach((student) => {
        const homeworkScore = student.scores.find(
            (score) => score.type === "homework"
        );
        if (homeworkScore && homeworkScore.score < worstHomeworkScore) {
            worstHomeworkScore = homeworkScore.score;
            worstHomeworkStudent = student;
        }
    });

    if (worstHomeworkStudent) {
        console.log(worstHomeworkScore);
        res.json(worstHomeworkStudent);
    } else {
        res.status(404).json({
            error: "No student found with a homework score",
        });
    }
});

module.exports = router;
