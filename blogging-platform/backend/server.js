const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
