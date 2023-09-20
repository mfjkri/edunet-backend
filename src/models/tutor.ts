import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import Centre from "./centre";
import User from "./user";
import Class from "./class";

export default class Tutor extends Model<
  InferAttributes<Tutor>,
  InferCreationAttributes<Tutor>
> {
  declare id: CreationOptional<number>;
  declare contact: string;

  declare userId: CreationOptional<number>;
  declare centreId: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly user?: NonAttribute<User>;
  declare readonly centre?: NonAttribute<Centre>;

  declare static associations: {
    user: Association<Tutor, User>;
    centre: Association<Tutor, Centre>;
    classes: Association<Tutor, Class>;
  };
}

export function init(db?: Sequelize) {
  Tutor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      centreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Centre,
          key: "id",
        },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );

  Tutor.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Tutor.belongsTo(Centre, {
    as: "centre",
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });
}
