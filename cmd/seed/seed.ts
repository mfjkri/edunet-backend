import {
  assignTutorToClass,
  createClass,
  enrollStudentInClass,
} from "../../src/dataaccess/class";
import {
  createStudentUser,
  createTutorUser,
  createUserWithCentreAndAdmin,
} from "../../src/dataaccess/user";

const admins = [
  {
    centreName: "testCentre",
    fullName: "admin",
    password: "123",
    email: "2@2.com",
    contact: "12345678",
  },
  {
    centreName: "otherCentre",
    fullName: "admin2",
    password: "123",
    email: "admin2@gmail.com",
    contact: "12345678",
  },
];

const tutors = [
  {
    fullName: "john",
    contact: "23456789",
    email: "5ee38e01-ca63-4601-93a5-07a09a0633d7@mailslurp.com",
    centre: "testCentre",
    classes: ["Class 1", "Class 2", "Class 3"],
  },
  {
    fullName: "bob",
    contact: "34567890",
    email: "ff65a0e1-55d6-4bf0-9430-bb90aae6048a@mailslurp.com",
    centre: "testCentre",
    classes: ["Class 4"],
  },
];

const students = [
  {
    studentFullName: "Booboo",
    studentEmail: "d446ba15-72b0-4a6f-bdec-4798f7cdea8c@mailslurp.com",
    studentContact: "24680248",
    parentFullName: "Muhammad Fikri",
    parentEmail: "084acf1c-c2df-4c2e-88d1-a23955e0d356@mailslurp.com",
    parentContact: "13579135",
    centre: "testCentre",
    classes: ["Class 1", "Class 2", "Class 3"],
  },
  {
    studentFullName: "Nini",
    studentEmail: "a06f9427-8d33-4e35-8650-23c76c2a833f@mailslurp.com",
    studentContact: "36925814",
    parentFullName: "RS",
    parentEmail: "f2af4e69-b322-43fe-aae6-758639e9a6be@mailslurp.com",
    parentContact: "48024680",
    centre: "testCentre",
    classes: ["Class 3", "Class 4"],
  },
  {
    studentFullName: "Flory",
    studentEmail: "e5ce89e2-8f1c-49fb-947d-5c218a8136c5@mailslurp.com",
    studentContact: "51015202",
    parentFullName: "RS",
    parentEmail: "f2af4e69-b322-43fe-aae6-758639e9a6be@mailslurp.com",
    parentContact: "48024680",
    centre: "testCentre",
    classes: ["Class 5"],
  },
];

const classes = [
  {
    name: "Class 1",
    day: "Monday",
    time: "10:00 - 11:00",
    venue: "Room #01-10",
    centre: "testCentre",
  },
  {
    name: "Class 2",
    day: "Tuesday",
    time: "11:00 - 12:00",
    venue: "Room #02-11",
    centre: "testCentre",
  },
  {
    name: "Class 3",
    day: "Wednesday",
    time: "12:00 - 13:00",
    venue: "Room #03-10",
    centre: "testCentre",
  },
  {
    name: "Class 4",
    day: "Thursday",
    time: "13:00 - 13:30",
    venue: "Room #01-10",
    centre: "testCentre",
  },
  {
    name: "Class 5",
    day: "Friday",
    time: "14:00 - 16:00",
    venue: "Room #01-10",
    centre: "testCentre",
  },
  {
    name: "Class 6",
    day: "Saturday",
    time: "15:00 - 17:00",
    venue: "Room #02-11",
    centre: "testCentre",
  },
];

export default async function seed() {
  const centres: any = {};

  for (const admin of admins) {
    const response = await createUserWithCentreAndAdmin(
      admin.centreName,
      admin.fullName,
      admin.email,
      admin.password,
      admin.contact
    );

    centres[admin.centreName] = { id: response.centre.id, classes: {} };
  }

  for (const singleClass of classes) {
    const centre = centres[singleClass.centre];
    const response = await createClass(
      centre.id,
      singleClass.name,
      singleClass.day,
      singleClass.time,
      singleClass.venue
    );
    centre.classes[singleClass.name] = response;
  }

  for (const tutor of tutors) {
    const centre = centres[tutor.centre];
    const response = await createTutorUser(
      centre.id,
      tutor.fullName,
      tutor.email,
      tutor.contact
    );

    for (const className of tutor.classes) {
      const singleClass = centre.classes[className];
      await assignTutorToClass(centre.id, singleClass.id, response.tutor.id);
    }
  }

  for (const student of students) {
    const centre = centres[student.centre];
    const response = await createStudentUser(
      centre.id,
      centre.classes[student.classes[0]].id,
      student.studentFullName,
      student.studentEmail,
      student.studentContact,
      student.parentFullName,
      student.parentEmail,
      student.parentContact
    );

    for (const className of student.classes) {
      const singleClass = centre.classes[className];
      await enrollStudentInClass(
        centre.id,
        singleClass.id,
        response.student.id
      );
    }
  }
}
