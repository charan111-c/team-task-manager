const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Tasks Working");
});

module.exports = router;