const express = require("express");
const {User} = require("../db");
const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("Hello World!");
})


module.exports = router;