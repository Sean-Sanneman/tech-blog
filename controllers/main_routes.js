const router = require("express").Router();

const { Post, Comment, User } = require("../models/index");

// get all posts for mainpage

router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((data) => {
      const posts = data.map((post) => {
        post.get({ plain: true });
      });
      res.render("all-posts", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// signup

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// get single posts for mainpage

router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((data) => {
      if (data) {
        const post = data.get({ plain: true });
        res.render("single-post", { post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
