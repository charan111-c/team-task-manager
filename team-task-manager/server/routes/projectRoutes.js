const router = require("express").Router();

const Project = require("../models/Project");

const auth = require("../middleware/authMiddleware");


// CREATE PROJECT
router.post("/", auth, async (req, res) => {

  try {

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.json(project);

  } catch (err) {

    res.status(500).json(err);
  }
});


// GET ALL PROJECTS
router.get("/", auth, async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;