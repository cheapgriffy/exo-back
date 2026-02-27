const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "BadRequest", message: "Champs manquants" });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "BadRequest", message: "Types invalides" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "BadRequest", message: "Mot de passe trop court (min 8)" });
  }

  next();
};

module.exports = validateUser;
