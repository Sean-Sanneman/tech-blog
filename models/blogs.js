const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/config.js");

class Blogs extends Model {}

Blogs.init(
  {
    // columns
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Blogs",
  }
);

module.exports = Blogs;
