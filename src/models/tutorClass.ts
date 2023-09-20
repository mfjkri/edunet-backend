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
import Tutor from "./tutor";

export default class TutorClass extends Model<
  InferAttributes<TutorClass>,
  InferCreationAttributes<TutorClass>
> {
  declare tutorId: number;
  declare classId: number;

  declare readonly tutor?: Tutor;
  declare readonly class?: Class;

  declare static associations: {
    tutor: Association<TutorClass, Tutor>;
    class: Association<TutorClass, Class>;
  };
}

export function init(db?: Sequelize) {
  TutorClass.init(
    {
      tutorId: {
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

  TutorClass.belongsTo(Tutor, {
    foreignKey: "tutorId",
    onDelete: "CASCADE",
  });

  TutorClass.belongsTo(Class, {
    foreignKey: "classId",
    onDelete: "CASCADE",
  });

  Class.belongsToMany(Tutor, {
    through: TutorClass,
    foreignKey: "classId",
    otherKey: "tutorId",
    as: "tutors",
  });

  Tutor.belongsToMany(Class, {
    through: TutorClass,
    foreignKey: "tutorId",
    otherKey: "classId",
    as: "classes",
  });
}
