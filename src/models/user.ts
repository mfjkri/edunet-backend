import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import { hashPassword } from "../utilities/auth";
import Avatar from "./avatar";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare fullname: string;
  declare email: string;
  declare password: string;
  declare type: string;

  declare avatarId: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getAvatar: BelongsToGetAssociationMixin<Avatar>;
  declare setAvatar: BelongsToSetAssociationMixin<Avatar, number>;

  declare readonly avatar?: NonAttribute<Avatar>;

  declare static associations: {
    avatar: Association<User, Avatar>;
  };
}

export function init(db?: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "student",
      },

      avatarId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Avatar,
          key: "id",
        },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    const avatar = await Avatar.create({
      bgColor: "blue",
      faceColor: "beige",
      hairStyle: "normal",
      hairColor: "black",
      hatStyle: "none",
      hatColor: "black",
      shirtStyle: "short",
      shirtColor: "red",
      earSize: "small",
      eyeStyle: "circle",
      glassesStyle: "none",
      noseStyle: "long",
      mouthStyle: "smile",
      sex: "male",
    });
    user.avatarId = avatar.id;
    user.password = hashedPassword;
  });

  User.beforeUpdate(async (user, options) => {
    if (options?.fields?.includes("password")) {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    }
  });

  User.belongsTo(Avatar, {
    as: "avatar",
    foreignKey: "avatarId",
    onDelete: "CASCADE",
  });
}
