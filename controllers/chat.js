const { Op } = require('sequelize');
const Chats = require("../models/chats");

exports.getAllChat = async (req,res) => {
  let lastId = req.query.lastId;

  if(lastId === 'undefined'){
    lastId = 0;
  }

  try {
    const result = await Chats.findAll({where: {
      id: { [Op.gt]: lastId },
    },});
    res.status(200).json({success:true,messages:result})
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
}

exports.addChat = async (req,res) => {
  const {message} = req.body;

  try {
    const result = await Chats.create({
      message,
      sender: req.user.name,
      userId: req.user.id,
    });
    res.status(201).json({success:true,message:result})
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
}