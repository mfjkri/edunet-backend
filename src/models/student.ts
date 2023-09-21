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
import Parent from "./parent";
import User from "./user";
import Class from "./class";

export default class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: CreationOptional<number>;
  declare contact: string;

  declare userId: number;
  declare centreId: number;
  declare parentId: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly user?: NonAttribute<User>;
  declare readonly centre?: NonAttribute<Centre>;
  declare readonly parent?: NonAttribute<Parent>;

  declare static associations: {
    user: Association<Student, User>;
    centre: Association<Student, Centre>;
    parent: Association<Student, Parent>;
    classes: Association<Student, Class>;
  };
}

export function init(db?: Sequelize) {
  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      centreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Centre,
          key: "id",
        },
      },

      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Parent,
          key: "id",
        },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );

  Student.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Student.belongsTo(Centre, {
    as: "centre",
    foreignKey: "centreId",
    onDelete: "CASCADE",
  });

  Student.belongsTo(Parent, {
    as: "parent",
    foreignKey: "parentId",
    onDelete: "CASCADE",
  });

  Parent.hasMany(Student, {
    as: "students",
    foreignKey: "parentId",
    onDelete: "CASCADE",
  });
}
