import { createAnnouncement } from "../../src/dataaccess/announcement";
import { assignTutorToClass, createClass } from "../../src/dataaccess/class";
import { createHomework } from "../../src/dataaccess/homework";
import { createNote } from "../../src/dataaccess/note";
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
    email: "admin@gmail.com",
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
    fullName: "Alice Bob",
    contact: "23456789",
    email: "tutor@gmail.com",
    centre: "testCentre",
    classes: ["Class 1", "Class 2", "Class 3"],
    notes: [{ title: "Only Note", content: "No notes from me" }],
    announcements: [
      {
        title: "Announcement 1",
        content: "This is an announcement",
        centre: "testCentre",
        class: "Class 1",
      },
      {
        title: "Announcement 2",
        content: "This is another announcement",
        centre: "testCentre",
        class: "Class 1",
      },
    ],
    homework: [
      {
        title: "Homework 1",
        description: "This is homework",
        dueDate: "2021-10-10",
        centre: "testCentre",
        class: "Class 1",
      },
      {
        title: "Homework 2",
        description: "This is another homework",
        dueDate: "2021-10-10",
        centre: "testCentre",
        class: "Class 1",
      },
    ],
  },
  {
    fullName: "Bobby Fischer",
    contact: "34567890",
    email: "ff65a0e1-55d6-4bf0-9430-bb90aae6048a@mailslurp.com",
    centre: "testCentre",
    classes: ["Class 4"],
    notes: [
      { title: "I Note", content: "This is a note" },
      { title: "II note", content: "This is another note" },
      { title: "III note", content: "This is a third note" },
    ],
    announcements: [
      {
        title: "Announcement 1",
        content: "This is an announcement",
        centre: "testCentre",
        class: "Class 4",
      },
      {
        title: "Announcement 2",
        content: "This is another announcement",
        centre: "testCentre",
        class: "Class 4",
      },
    ],
    homework: [
      {
        title: "Homework 3",
        description: "This is homework",
        dueDate: "2021-10-10",
        centre: "testCentre",
        class: "Class 4",
      },
      {
        title: "Homework 4",
        description: "This is another homework",
        dueDate: "2021-10-10",
        centre: "testCentre",
        class: "Class 4",
      },
    ],
  },
];

const students = [
  {
    studentFullName: "John Doe",
    studentEmail: "student@gmail.com",
    studentContact: "24680248",
    parentFullName: "Concerned Parent 1",
    parentEmail: "parent@gmail.com",
    parentContact: "13579135",
    centre: "testCentre",
    classes: ["Class 1", "Class 2", "Class 3"],
    notes: [
      { title: "I Note", content: "This is a note" },
      { title: "II note", content: "This is another note" },
      { title: "III note", content: "This is a third note" },
    ],
  },
  {
    studentFullName: "Mary Jane",
    studentEmail: "a06f9427-8d33-4e35-8650-23c76c2a833f@mailslurp.com",
    studentContact: "36925814",
    parentFullName: "Cristopher Robin",
    parentEmail: "f2af4e69-b322-43fe-aae6-758639e9a6be@mailslurp.com",
    parentContact: "48024680",
    centre: "testCentre",
    classes: ["Class 3", "Class 4"],
    notes: [{ title: "YesNote", content: "This is a single note" }],
  },
  {
    studentFullName: "Mariah Eh",
    studentEmail: "e5ce89e2-8f1c-49fb-947d-5c218a8136c5@mailslurp.com",
    studentContact: "51015202",
    parentFullName: "Concerned Parent 1",
    parentEmail: "parent@gmail.com",
    parentContact: "48024680",
    centre: "testCentre",
    classes: ["Class 5"],
    notes: [],
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

    for (const note of tutor.notes) {
      await createNote(
        centre.id,
        response.tutor.userId,
        1,
        note.title,
        note.content
      );
    }

    await assignTutorToClass(
      centre.id,
      tutor.classes.map((className) => centre.classes[className].id),
      response.tutor.id
    );

    for (const announcement of tutor.announcements) {
      await createAnnouncement(
        centre.id,
        centre.classes[announcement.class].id,
        response.tutor.id,
        announcement.title,
        announcement.content
      );
    }

    for (const homework of tutor.homework) {
      await createHomework(
        centre.id,
        centre.classes[homework.class].id,
        response.tutor.id,
        homework.title,
        homework.description,
        homework.dueDate
      );
    }
  }

  for (const student of students) {
    const centre = centres[student.centre];
    const response = await createStudentUser(
      centre.id,
      student.classes.map((className) => centre.classes[className].id),
      student.studentFullName,
      student.studentEmail,
      student.studentContact,
      student.parentFullName,
      student.parentEmail,
      student.parentContact
    );

    for (const note of student.notes) {
      await createNote(
        centre.id,
        response.student.userId,
        1,
        note.title,
        note.content
      );
    }
  }
}
