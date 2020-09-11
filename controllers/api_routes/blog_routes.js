const router = require("express").Router();
const { Blogs } = require("../../models/");

router.get("/", (req, res) => {
  return res.status(200).json({ message: "smoke test" });
});

router.post("/", (req, res) => {
  Blogs.create(req.body)
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  Blogs.update(req.body, {
    where: { id: req.params.id },
  })
    .then((upBlog) => {
      res.json(upBlog);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  Blogs.destroy(req.body, {
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
