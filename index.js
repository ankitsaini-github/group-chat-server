const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const sequelize = require("./utils/database");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const Users = require("./models/users")
const Chats = require("./models/chats")

app.use(cors({
  origin:'*',
  methods:['GET','POST'],
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));


app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

Users.hasMany(Chats);
Chats.belongsTo(Users);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
    console.log(
      `\u001b[1;32m app listening on port number --> ${port} \u001b[0m`
    );
  })
  .catch((err) => {
    console.log(err);
  });