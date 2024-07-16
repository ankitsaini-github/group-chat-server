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