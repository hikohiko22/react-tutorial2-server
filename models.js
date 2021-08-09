import pg from "pg";
import Sequelize from "sequelize";

// pg.defaults.ssl = true;
const { DataTypes } = Sequelize;

const url =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/review_app";
console.log(process.env.DATABASE_URL);
export const sequelize = new Sequelize(url, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const User = sequelize.define(
  "user",
  {
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { underscored: true },
);

export const Restaurant = sequelize.define(
  "restaurant",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    map: {
      type: DataTypes.TEXT,
    },
  },
  { underscored: true },
);

export const Review = sequelize.define(
  "review",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
      },
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { underscored: true },
);

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);
User.hasMany(Review);
Review.belongsTo(User);