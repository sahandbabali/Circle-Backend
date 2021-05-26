const express = require("express");
const { use } = require("./routes/users");
const connectdb = require("./config/db");

const app = express();
const port = 3000;

const usersroute = require("./routes/users");
const contactsroute = require("./routes/contacts");
const authroute = require("./routes/auth");

// init middleware
app.use(express.json({ extended: false }));
//connect db
connectdb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", usersroute);
app.use("/api/contacts", contactsroute);
app.use("/api/auth", authroute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
