import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import User from "./user";

export default class ResetPasswordToken extends Model<
  InferAttributes<ResetPasswordToken>,
  InferCreationAttributes<ResetPasswordToken>
> {
  declare id: CreationOptional<number>;
  declare userId: number;

  declare otp: string;
  declare expireAt: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init(db?: Sequelize) {
  ResetPasswordToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },

      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize: db || getDB(),
    }
  );

  ResetPasswordToken.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
