const express = require("express");
const router = new express.Router();
const { createpost, fetchPosts } = require("../Controller/postController");
const auth = require("../utils/auth");
router.post("/createpost", auth, createpost);
router.get("/post", fetchPosts);
module.exports = router;
