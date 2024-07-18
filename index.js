const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const server = require('http').createServer(app);

const io = require('socket.io')(server,{
  cors:{ origins:['*'] },
});

io.on('connection',(socket)=>{
  console.log(socket.id)
  
  socket.on('join-group',groupId=>{
    socket.join(groupId);
  })

  socket.on('send-chat', (data,groupId)=>{
    console.log('chat = ',data);
    if(groupId){
      socket.to(groupId).emit('receive-chat',data.message);

    }
  })

})

const sequelize = require("./utils/database");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

const Users = require("./models/users")
const Chats = require("./models/chats")
const Groups = require("./models/groups")
const GroupMembers = require("./models/groupmembers")

app.use(cors({
  origin:'*',
  methods:['GET','POST','DELETE'],
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));


app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);

Users.hasMany(Chats);
Chats.belongsTo(Users);
Groups.belongsToMany(Users, { through: GroupMembers, foreignKey:'groupId'});
Users.belongsToMany(Groups, { through: GroupMembers});
// GroupMembers.belongsTo(Users, { foreignKey: 'userId' });
// GroupMembers.belongsTo(Groups, { foreignKey: 'groupId' });
// Groups.hasMany(GroupMembers);
// GroupMembers.belongsTo(Groups);
// Users.hasMany(GroupMembers);
// GroupMembers.belongsTo(Users);

sequelize
  .sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`\u001b[1;32m Server listening on port number : ${port} \u001b[0m`);
    });
  })
  .catch((err) => {
    console.log(err);
  });