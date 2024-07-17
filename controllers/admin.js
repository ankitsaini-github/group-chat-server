const sequelize = require("../utils/database");
const Groups = require("../models/groups");
const Users = require("../models/users");
const GroupMembers = require("../models/groupmembers");

exports.addGroup = async(req,res)=>{
  const {groupName} = req.body;
  const userId = req.user.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      // Create group
      const group = await Groups.create({
        groupName,
        createdBy: userId,
      }, { transaction: t });

      // Add the creator to the groupmembers
      await GroupMembers.create({
        isAdmin: true,
        groupId: group.groupId,
        userId: userId,
      }, { transaction: t });

      return group;
    });

    res.status(201).json({success:true, message:'Group Created Successfully!', groupInfo:result});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add Group." });
  }
}

exports.getGroups = async(req,res)=>{
  const userId = req.user.id;
  try {
    const result = await Users.findOne({
      where: { id: userId },
      include: [{
        model: Groups,
        attributes: ['groupName','groupId','createdBy'],
        through: { attributes: [] }
      }]
    });
    const groupNames = result.groups;

    console.log('groups = ',groupNames)
    res.status(200).json({ success: true, groups:groupNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch groups." });
  }
}

exports.getGroupMembers = async(req,res)=>{
  const groupId=req.query.groupId;
  try {
    const result = await Groups.findOne({
      where: { groupId },
      include: [{
        model: Users,
        attributes: ['id','name'],
        through: { attributes: ['isAdmin'] }
      }]
    });

    console.log('groups = ',result)
    res.status(200).json({ success: true, groupMembers:result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch group members." });
  }
}

exports.addGroupMembers = async(req,res)=>{
  const {userEmail, isAdmin, groupId} = req.body;

  try {

    const user = await Users.findOne({ where: { email: userEmail } });
    if(!user){
      return res.status(404).json({ error: "User not found." });
    }
    
    const existingMember = await GroupMembers.findOne({ 
      where: { 
        userId: user.id,
        groupId: groupId
      }
    });
    if (existingMember) {
      return res.status(400).json({ error: "User is already a member of the group." });
    }
    const result = await GroupMembers.create({
      userId: user.id,
      groupId,
      isAdmin: isAdmin || false
    });

    res.status(201).json({ success: true, message: "User added to group successfully.", newUser:{id:result.userId, name:user.name, groupmembers:{isAdmin:result.isAdmin}}  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user to group." });
  }
}

exports.removeGroupMembers = async(req,res)=>{
  const userId = req.user.id;
  const {id,groupId}=req.query;

  try {
    
    const adminMember = await GroupMembers.findOne({ 
      where: { 
        userId: userId,
        groupId: groupId,
        isAdmin:true
      }
    });
    if (!adminMember) {
      return res.status(400).json({ error: "You do not have Admin Rights." });
    }
    
    const user = await GroupMembers.findOne({ where: { userId: id, groupId } });
    if(!user){
      return res.status(404).json({ error: "User not found." });
    }

    await user.destroy();
    
    res.status(200).json({ success: true, message: "User removed from group successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove user from group." });
  }
}