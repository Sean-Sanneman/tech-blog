const Blogs = require("./blogs");
const Comments = require("./comments");
const User = require("./user");

// blogs belongs to user
Blogs.belongsTo(User);

// blogs have many comments
Blogs.hasMany(Comments, {
  foreignKey: "blog_id",
});

// comments belong to user
Comments.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  Blogs,
  Comments,
  User,
};
