const router = require("express").Router();
const { User } = require("../../models/");

router.post("/", (req, res) => {
  User.create({
    user_name: req.body.username,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.user_name;
    });
  });
});

module.exports = router;
