const Post = require("../models/posts.model");

const listPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAllPublic();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "BadRequest", message: "ID invalide" });
    }

    const post = await Post.findByIdPublic(id);
    if (!post) {
      return res.status(404).json({ error: "NotFound", message: "Article introuvable" });
    }

    const { user_id, ...publicPost } = post;
    res.json(publicPost);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "BadRequest", message: "Champs manquants" });
    }

    const id = await Post.create({
      userId: req.userId,
      title,
      content,
    });

    res.status(201).json({ message: "Article créé", id });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "BadRequest", message: "ID invalide" });
    }
    if (!title || !content) {
      return res.status(400).json({ error: "BadRequest", message: "Champs manquants" });
    }

    const affected = await Post.updateByIdForUser({
      id,
      userId: req.userId,
      title,
      content,
    });

    if (affected === 0) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Pas autorisé (ou article introuvable)",
      });
    }

    res.json({ message: "Article modifié" });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "BadRequest", message: "ID invalide" });
    }

    const affected = await Post.deleteByIdForUser({
      id,
      userId: req.userId,
    });
console.log(req)
    if (affected === 0) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Pas autorisé (ou article introuvable)",
      });
    }

    res.json({ message: "Article supprimé" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
