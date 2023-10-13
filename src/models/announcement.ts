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
import User from "./user";
import Class from "./class";

export default class Announcement extends Model<
  InferAttributes<Announcement>,
  InferCreationAttributes<Announcement>
> {
  declare id: CreationOptional<number>;

  declare centreId: number;
  declare classId: number;
  declare creatorId: number;

  declare title: string;
  declare content: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly centre?: Centre;
  declare readonly class?: Class;
  declare readonly creator?: User;

  declare static associations: {
    centre: Association<Announcement, Centre>;
    class: Association<Announcement, Class>;
    creator: Association<Announcement, User>;
  };
}

export function init(db?: Sequelize) {
  Announcement.init(
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
      content: {
        type: DataTypes.STRING(10000),
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

  Announcement.belongsTo(Centre, {
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });
  Announcement.belongsTo(User, {
    foreignKey: "creatorId",
    onDelete: "CASCADE",
    as: "creator",
  });
  Announcement.belongsTo(Class, {
    foreignKey: "classId",
    onDelete: "CASCADE",
    as: "class",
  });
}
