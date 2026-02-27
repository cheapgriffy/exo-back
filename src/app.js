require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/users.route");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/posts.route");
const commentRoutes = require("./routes/comment.route");


const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});
