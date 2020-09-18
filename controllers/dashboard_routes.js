const router = require("express").Router();
const { Blogs, User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
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

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Blogs.findByPk(req.params.id)
    .then((response) => {
      const post = response.get({
        plain: true,
      });
      console.log(post);
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
