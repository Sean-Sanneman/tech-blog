const router = require("express").Router();

const { Blogs, Comments, User } = require("../models/index");

// get all posts for mainpage

router.get("/", (req, res) => {
  Blogs.findAll({
    attributes: ["blog_id", "blog_name", "blog_text", "created_at"],
    include: [User],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      console.log(posts);
      console.log(data);
      res.render("all-posts", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// signup
router.get("/dashboard", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("dashboard");
});

//new blog
router.get("/dashboard/new", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("new-post");
});

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

router.get("/blog/:id", (req, res) => {
  Blogs.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comments,
        include: [User],
      },
    ],
  })
    .then((data) => {
      if (data) {
        const post = data.get({ plain: true });
        console.log(post);
        console.log(data);
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
