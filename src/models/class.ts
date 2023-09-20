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
import Student from "./student";

export default class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare day: string;
  declare time: string;
  declare venue: string;

  declare centreId: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly centre?: NonAttribute<Centre>;

  declare static associations: {
    centre: Association<Class, Centre>;
    students: Association<Class, Student>;
  };
}

export function init(db?: Sequelize) {
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
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

  Class.belongsTo(Centre, {
    as: "centre",
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });
}
