const router = require("express").Router();
const { Comments } = require("../../models/");

router.post("/", (req, res) => {
  Comments.create(req.body)
    .then((newCom) => {
      res.json(newCom);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
