const bcrypt = require("bcrypt");

const sequelize = require("../utils/database");
const Users = require("../models/users");

const saltRounds = Number(process.env.HASH_SALT);

exports.signUp = async (req, res, next) => {
  const { name, phone, email, password } = req.body;
  console.log('got body = ',req.body);
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password should be at least 8 characters long." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await Users.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });
    res.status(201).json({success:true,message:'Account created successfully.',user:{name:result.name,phone:result.phone,email:result.email}});
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ error: "User already exists." });
    } else if (err.name === "SequelizeValidationError") {
      res.status(400).json({ error: "Validation error." });
    } else {
      console.error(err);
      res.status(500).json({ error: "Failed to add user." });
    }
  }

}