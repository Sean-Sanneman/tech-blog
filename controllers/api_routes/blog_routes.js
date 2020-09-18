const router = require("express").Router();
const { Blogs } = require("../../models/");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (req, res) => {
  return res.status(200).json({ message: "smoke test" });
});

router.post("/", withAuth, (req, res) => {
  Blogs.create({
    blog_name: req.body.blog_name,
    blog_text: req.body.body,
    userId: req.session.userID,
  })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", withAuth, (req, res) => {
  Blogs.update(req.body, {
    where: { id: req.params.id },
  })
    .then((upBlog) => {
      res.json(upBlog);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", withAuth, (req, res) => {
  Blogs.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
