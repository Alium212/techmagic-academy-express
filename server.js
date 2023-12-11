const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const articleRoutes = require("./routes/articleRoutes");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");

// Middleware
app.use(express.json());
app.use(requestLogger);
app.use(errorHandler);

// Routes
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use('/articles', articleRoutes);

// Server setup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
