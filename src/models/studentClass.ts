import {
  Association,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import Class from "./class";
import Student from "./student";

export default class StudentClass extends Model<
  InferAttributes<StudentClass>,
  InferCreationAttributes<StudentClass>
> {
  declare studentId: number;
  declare classId: number;

  declare readonly student?: Student;
  declare readonly class?: Class;

  declare static associations: {
    student: Association<StudentClass, Student>;
    class: Association<StudentClass, Class>;
  };
}

export function init(db?: Sequelize) {
  StudentClass.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    { sequelize: db || getDB() }
  );

  StudentClass.belongsTo(Student, {
    foreignKey: "studentId",
    onDelete: "CASCADE",
  });

  StudentClass.belongsTo(Class, {
    foreignKey: "classId",
    onDelete: "CASCADE",
  });

  Class.belongsToMany(Student, {
    through: StudentClass,
    foreignKey: "classId",
    otherKey: "studentId",
    as: "students",
  });

  Student.belongsToMany(Class, {
    through: StudentClass,
    foreignKey: "studentId",
    otherKey: "classId",
    as: "classes",
  });
}
