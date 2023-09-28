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

export default class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;

  declare centreId: number;
  declare senderId: number;
  declare receiverId: number;

  declare content: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly centre?: Centre;
  declare readonly sender?: User;
  declare readonly receiver?: User;

  declare static associations: {
    centre: Association<Message, Centre>;
    user: Association<Message, User>;
  };
}

export function init(db?: Sequelize) {
  Message.init(
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
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      content: {
        type: DataTypes.STRING,
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

  Message.belongsTo(Centre, {
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });

  Message.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
