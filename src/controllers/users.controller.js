const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAllPublic();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check email exist
    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "Conflict", message: "Email déjà utilisé" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert
    const id = await User.create(email, hashedPassword);

    res.status(201).json({ message: "Utilisateur créé", id, email });
  } catch (err) {
    // si UNIQUE(email) côté DB
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Conflict", message: "Email déjà utilisé" });
    }
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const me = await User.findPublicById(req.userId);
    if (!me) {
      return res.status(404).json({ error: "NotFound", message: "Utilisateur introuvable" });
    }
    res.json(me);
  } catch (err) {
    next(err);
  }
};

module.exports = { listUsers, createUser, getMe };
