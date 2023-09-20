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

export default class Parent extends Model<
  InferAttributes<Parent>,
  InferCreationAttributes<Parent>
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
    user: Association<Parent, User>;
    centre: Association<Parent, Centre>;
  };
}

export function init(db?: Sequelize) {
  Parent.init(
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

  Parent.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Parent.belongsTo(Centre, {
    as: "centre",
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });
}
