import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";

export default class Avatar extends Model<
  InferAttributes<Avatar>,
  InferCreationAttributes<Avatar>
> {
  declare id: CreationOptional<number>;

  declare sex: string;
  declare bgColor: string;
  declare faceColor: string;

  declare hairStyle: string;
  declare hairColor: string;

  declare hatColor: string;
  declare hatStyle: string;

  declare shirtStyle: string;
  declare shirtColor: string;

  declare earSize: string;
  declare eyeStyle: string;
  declare glassesStyle: string;
  declare noseStyle: string;
  declare mouthStyle: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init(db?: Sequelize) {
  Avatar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bgColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faceColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      hairStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hairColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      hatColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hatStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      shirtStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shirtColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      earSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eyeStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      glassesStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noseStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mouthStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );
}
