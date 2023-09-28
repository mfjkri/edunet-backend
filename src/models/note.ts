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

export default class Note extends Model<
  InferAttributes<Note>,
  InferCreationAttributes<Note>
> {
  declare id: CreationOptional<number>;

  declare centreId: number;
  declare userId: number;

  declare title: string;
  declare content: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly centre?: Centre;
  declare readonly user?: User;

  declare static associations: {
    centre: Association<Note, Centre>;
    user: Association<Note, User>;
  };
}

export function init(db?: Sequelize) {
  Note.init(
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(2500),
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

  Note.belongsTo(Centre, {
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });

  Note.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  User.hasMany(Note, {
    foreignKey: "userId",
    as: "notes",
  });
}
