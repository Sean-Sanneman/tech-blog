const router = require("express").Router();
const { User } = require("../../models/");

router.post("/", (req, res) => {
  User.create({
    user_name: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.user_name;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.user_name,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "User account not found!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Invalid password!" });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.user_name;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/user/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
