import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import Centre from "./centre";
import Class from "./class";
import User from "./user";

export default class Homework extends Model<
  InferAttributes<Homework>,
  InferCreationAttributes<Homework>
> {
  declare id: CreationOptional<number>;

  declare centreId: number;
  declare classId: number;
  declare creatorId: number;

  declare title: string;
  declare description: string;
  declare dueDate: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly centre?: Centre;
  declare readonly class?: Class;
  declare readonly creator?: User;

  declare static associations: {
    centre: Association<Homework, Centre>;
    class: Association<Homework, Class>;
    creator: Association<Homework, User>;
  };
}

export function init(db?: Sequelize) {
  Homework.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      centreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { sequelize: db || getDB() }
  );

  Homework.belongsTo(Centre, {
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });
  Homework.belongsTo(Class, {
    foreignKey: "classId",
    onDelete: "CASCADE",
    as: "class",
  });
  Homework.belongsTo(User, {
    foreignKey: "creatorId",
    onDelete: "CASCADE",
    as: "creator",
  });
}
