const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "BadRequest", message: "Champs manquants" });
    }

    const user = await User.findByEmail(email);

    // message neutre (sécurité)
    if (!user) {
      return res.status(401).json({ error: "Unauthorized", message: "Identifiants invalides" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: "Unauthorized", message: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({ message: "Login OK", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
