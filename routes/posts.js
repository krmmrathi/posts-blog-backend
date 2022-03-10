const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let post = new Post(req.body);
    post = await post.save();
    res.status(200).json( post);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const skip = req.query.skip ? req.query.skip : 0;
    const limit = req.query.limit ? req.query.limit : 10;
    const postListLength = await Post.countDocuments();
    let posts = await Post.find().sort( { id: -1 } ).skip(skip).limit(limit);
    return res.status(200).json({posts: posts, length: postListLength});
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:postId/comments", async (req, res) => {
  try {
    let comments = await Comment.find({
      postId: req.params.postId,
    });
    if (comments) {
      return res.status(200).json(comments);
    }
    return res.status(400).json({
      status: 400,
      message: `No comments were found associated with the post ${req.params.postId}.`,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});


router.get("/:postId", async (req, res) => {
  try {
    let post = await Post.findOne({
      id: req.params.postId,
    });
    if (post) {
      return res.status(200).json(post);
    }
    return res.status(400).json({
      status: 400,
      message: "No such post was found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:postId", async (req, res) => {
  try {
    let post = await Post.findOneAndUpdate({id: req.params.postId}, req.body, {
      new: true,
    });
    if (post) {
      return res.status(200).json(post);
    }
    res.status(400).json({
      status: 400,
      message: `Update operation for post ${req.params.postId} failed.`,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    let post = await Post.findOneAndDelete({id: req.params.postId});
    if (post) {
      res.status(200).json(
        "Post deleted successfully",
      );
    } else {
      res.status(400).json({
        status: 400,
        message: `Delete operation for post ${req.params.postId} failed.`,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;