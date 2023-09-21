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
import Student from "./student";
import Class from "./class";

export default class Assessment extends Model<
  InferAttributes<Assessment>,
  InferCreationAttributes<Assessment>
> {
  declare id: CreationOptional<number>;

  declare centreId: number;
  declare classId: number;
  declare studentId: number;

  declare name: string;
  declare total: number;
  declare score: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly centre?: Centre;
  declare readonly class?: Class;
  declare readonly student?: Student;

  declare static associations: {
    centre: Association<Assessment, Centre>;
    class: Association<Assessment, Class>;
    student: Association<Assessment, Student>;
  };
}

export function init(db?: Sequelize) {
  Assessment.init(
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
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
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

  Assessment.belongsTo(Centre, {
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });

  Assessment.belongsTo(Class, {
    foreignKey: "classId",
    onDelete: "CASCADE",
  });

  Assessment.belongsTo(Student, {
    foreignKey: "studentId",
    onDelete: "CASCADE",
  });

  Student.hasMany(Assessment, {
    foreignKey: "studentId",
    as: "assessments",
  });
}
