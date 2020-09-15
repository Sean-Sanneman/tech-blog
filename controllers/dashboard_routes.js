const router = require("express").Router();
const { Blogs, User } = require("../models/");

router.get("/", (req, res) => {
  Blogs.findAll({
    include: [User],
  })
    .then((response) => {
      const posts = response.map((post) =>
        post.get({
          plain: true,
        })
      );
      res.render("all-posts-admin", {
        layout: "dashboard",
        posts,
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/new", (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", (req, res) => {
  Blogs.findOne({
    where: req.params.id,
  })
    .then((response) => {
      const post = response.get({
        plain: true,
      });
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
