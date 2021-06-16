const express = require("express");
const router = new express.Router();
const { createpost } = require("../Controller/postController");
router.post("/createpost", createpost);

module.exports = router;
